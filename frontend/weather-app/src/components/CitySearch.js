import React, { useState, useEffect, useContext } from "react";
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import WeatherInfo from './WeatherInfo';
import TemperatureUnitComponent from "./TemperatureUnitComponent";
import { Divider, IconButton } from "@mui/material";
import { CitySearchContext } from "./context/CitySearchContext";
import { debounce } from "lodash";


const CitySearch = () => {
    const [value, setValue] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [tempUnit, setTempUnit] = useState('celsius');
    const [suggestionsData, setSuggestionsData] = useState([]);
    const { suggestions, fetchSuggestions, myLocationHandleClick, myLocationValue } = useContext(CitySearchContext);

    const changeTemperatureUnit = (tempUnitValue) => {
        setTempUnit(tempUnitValue);
    }

    useEffect(() => {
        if (searchQuery.length >= 2) {
            fetchSuggestions(searchQuery);
            setSuggestionsData(suggestions);
        }
    }, [searchQuery]);

    const handleLocationClick = () => {
        myLocationHandleClick();
        setValue(myLocationValue);
        setSuggestionsData(myLocationValue);
    }

    return (
        <>
            <div className='temp-unit-location-icon-box'>
                <TemperatureUnitComponent changeTemperatureUnit={changeTemperatureUnit} selectedUnit={tempUnit} />
            </div>
            <Grid
                container
                spacing={1}
                direction="row"
                justifyContent="center"
                alignItems="center"
            >
                <div style={{ width: 550 }}>
                    <Autocomplete
                        id="city-search"
                        isOptionEqualToValue={(option, value) => option?.geonameId === value?.geonameId}
                        value={value}
                        fullWidth={true}
                        onChange={(event, newValue) => {
                            setValue(newValue);
                        }}
                        onInputChange={(event, newInputValue) => {
                            setSearchQuery(newInputValue);
                        }}
                        options={suggestionsData}
                        renderOption={(props, option) => {
                            const matches = match(option.name, searchQuery, { insideWords: true });
                            const parts = parse(option.name, matches);
                            const country = option.countryName;

                            return (
                                <>
                                    <li {...props}>
                                        <Grid container alignItems="center">
                                            <Grid item sx={{ display: 'flex', width: 44 }}>
                                                <LocationOnIcon sx={{ color: 'text.secondary' }} />
                                            </Grid>
                                            <Grid item sx={{ width: 'calc(100% - 44px)', wordWrap: 'break-word' }}>
                                                {parts.map((part, index) => (
                                                    <Box
                                                        key={index}
                                                        component="span"
                                                        sx={{ fontWeight: part.highlight ? 'bold' : 'regular' }}
                                                    >
                                                        {part.text}
                                                    </Box>
                                                ))}

                                                <Typography variant="body2" color="text.secondary">
                                                    {country}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </li>
                                </>
                            );
                        }}
                        getOptionLabel={(option) => option.name + ', ' + (option.countryName || '')}
                        renderInput={(params) =>
                            <TextField {...params} label="Search a city" variant="standard" fullWidth={true}
                            />
                        }
                        autoComplete
                        includeInputInList
                        filterSelectedOptions
                        noOptionsText="No cities found"
                    />
                </div>
                <div>
                    <IconButton variant="text" > <MyLocationIcon style={{ fontSize: 18 }} onClick={handleLocationClick} /> </IconButton>
                </div>
            </Grid>

            {
                value && (
                    <WeatherInfo cityName={value.toponymName + ', ' + value.countryName} longitude={value.lng} latitude={value.lat} tempUnit={tempUnit} />
                )
            }
        </>
    );
};

export default CitySearch;
