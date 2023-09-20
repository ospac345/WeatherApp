import React, { useState, useEffect } from "react";
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import SearchIcon from '@mui/icons-material/Search';
import { Divider, IconButton } from "@mui/material";
import _ from 'lodash';
import { useDispatch, useSelector } from "react-redux";
import { fetchCityData, setCityCoordErrorMessage, setErrorToNull, setCityData } from "../actions/cityActions";
import { fetchWeatherData, setSelectedCityData } from "../actions/weatherActions";
import axios from "axios";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';


const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


const CitySearch = ({ closeSearchModal }) => {
    const [keyword, setKeyword] = useState('');
    const tempUnit = useSelector((state) => state.weather.tempUnit);
    const cityData = useSelector((state) => state.city.cityData);
    const cityError = useSelector((state) => state.city.error);
    const isLoading = useSelector((state) => state.city.isLoading);
    const dispatch = useDispatch();


    const debouncedFetchCityData = _.debounce((keyword) => {
        dispatch(fetchCityData(keyword));
    }, 500);

    useEffect(() => {
        if (keyword.length >= 2) {
            debouncedFetchCityData(keyword);
            return debouncedFetchCityData.cancel;
        }
    }, [keyword]);

    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        dispatch(setErrorToNull());
    };


    const handleMyLocation = () => {
        return new Promise(async (resolve, reject) => {
            if (navigator.geolocation) {
                try {
                    const position = await new Promise((innerResolve, innerReject) => {
                        navigator.geolocation.getCurrentPosition(
                            innerResolve,
                            innerReject
                        );
                    });
                    const latitude = position.coords.latitude;
                    const longitude = position.coords.longitude;
                    resolve({ latitude, longitude });
                    const requestData = {
                        lat: latitude,
                        lng: longitude,
                    };

                    try {
                        const response = await axios.post("/api/coords", requestData);
                        if (response.status === 200) {
                            const data = response.data;
                            dispatch(fetchWeatherData(latitude, longitude, tempUnit));
                            dispatch(setSelectedCityData(data.geonames[0]));
                            closeSearchModal();
                        } else {
                            throw new Error("Request failed");
                        }
                    } catch (error) {
                        console.error("Error fetching coordinates data:", error);
                        dispatch(setCityCoordErrorMessage(error.message));
                    }
                } catch (error) {
                    // reject(error);
                    dispatch(setCityCoordErrorMessage(error.message));
                }
            } else {
                reject(new Error("Geolocation not supported"));
                dispatch(setCityCoordErrorMessage("Geolocation not supported"));
            }
        });
    };


    return (
        <>
            <Grid
                container
                spacing={1}
                direction="row"
                justifyContent="center"
                alignItems="center"
                sx={{ marginTop: 5, marginBottom: 3 }}
            >
                <Snackbar sx={{ minWidth: '80%' }} open={Boolean(cityError)} autoHideDuration={6000} onClose={handleSnackbarClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }} >
                    <Alert severity="error" onClose={handleSnackbarClose} sx={{ width: '100%' }}>
                        {cityError}
                    </Alert>
                </Snackbar>

                <div style={{ width: 550 }}>
                    <Autocomplete
                        forcePopupIcon={false}
                        autoHighlight
                        fullWidth
                        options={cityData}
                        isOptionEqualToValue={(option, value) => option.geonameId === value.geonameId}
                        renderOption={(props, option, index) => {
                            const matches = match(option.name, keyword, { insideWords: true });
                            const parts = parse(option.name, matches);
                            const country = option.countryName;

                            // Create a unique key for the option
                            const optionKey = `option-${option.geonameId}-${index.index}`;
                            return (
                                <li {...props} key={optionKey}>
                                    <Grid container alignItems="center" key={`grid-${optionKey}`}>
                                        <Grid item sx={{ display: 'flex', width: 44 }} key={`icon-${optionKey}`}>
                                            <LocationOnIcon sx={{ color: 'text.secondary' }} />
                                        </Grid>
                                        <Grid item sx={{ width: 'calc(100% - 44px)', wordWrap: 'break-word' }} key={`content-${optionKey}`}>
                                            {parts.map((part, index) => (
                                                <Box
                                                    key={`part-${index}-${optionKey}`}
                                                    component="span"
                                                    sx={{ fontWeight: part.highlight ? 'bold' : 'regular' }}
                                                >
                                                    {part.text}
                                                </Box>
                                            ))}

                                            <Typography variant="body2" color="text.secondary" key={`country-${optionKey}`}>
                                                {country}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </li>
                            );
                        }}
                        inputValue={keyword}
                        onInputChange={(event, newInputValue) => {
                            setKeyword(newInputValue);
                        }}
                        onChange={(event, newValue) => {
                            if (newValue) {
                                dispatch(fetchWeatherData(newValue.lat, newValue.lng, tempUnit));
                                dispatch(setSelectedCityData(newValue));
                                closeSearchModal();
                            }
                        }}
                        clearOnEscape={true}
                        getOptionLabel={(option) => option.name}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Search for a place"
                                variant="outlined"
                                fullWidth
                                InputProps={{
                                    ...params.InputProps,
                                    startAdornment: (
                                        <>
                                            <IconButton type="button" sx={{ p: '3px' }} aria-label="search">
                                                <SearchIcon />
                                            </IconButton>
                                            {params.InputProps.startAdornment}
                                        </>
                                    ),
                                    endAdornment: (
                                        <>
                                            <Divider orientation="vertical" flexItem />
                                            {params.InputProps.endAdornment}
                                            <IconButton color="primary" sx={{ p: '10px' }} onClick={(event) => { handleMyLocation() }} aria-label="my location">
                                                <MyLocationIcon sx={{ fontSize: 18 }} />
                                            </IconButton>
                                        </>
                                    ),
                                }}
                            />
                        )}
                        loading={isLoading}
                        loadingText="Loading..."
                        noOptionsText={
                            keyword.length >= 2
                                ? "No results found"
                                : "Type at least 2 characters to search"
                        }
                        onOpen={() => {
                            setKeyword('');
                            dispatch(setErrorToNull());
                        }}
                        onClose={() => {
                            setKeyword('');
                            dispatch(setErrorToNull());
                            dispatch(setCityData([]));
                        }}
                    />
                </div>
            </Grid>
        </>
    );
};

export default CitySearch;
