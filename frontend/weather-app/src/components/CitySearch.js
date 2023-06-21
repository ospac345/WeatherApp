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
import WeatherInfo from './WeatherInfo';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';


const CitySearch = () => {
    const [value, setValue] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);

    useEffect(() => {
        const fetchSuggestions = async () => {
            try {
                const response = await fetch('http://localhost:3001/api', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ value: searchQuery }),
                });
                if (response.ok) {
                    const data = await response.json();
                    if (data) {
                        setSuggestions([...data.geonames]);
                    } else {
                        setSuggestions([]);
                    }
                } else {
                    throw new Error('Request failed');
                }
            } catch (error) {
                console.error('Error fetching suggestions:', error);
                setSuggestions([]);
            }
        };

        fetchSuggestions();

    }, [searchQuery]);

    const handleLocationClick = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(success, error);
        } else {
            console.log("Geolocation not supported");
        }

        function success(position) {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;

            const requestData = {
                lat: latitude,
                lng: longitude,
            };

            fetch("http://localhost:3001/api/coords", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(requestData),
            })
                .then((response) => {
                    if (response.ok) {
                        return response.json(); // Parse the response data as JSON
                    } else {
                        throw new Error("Failed to send coordinates");
                    }
                })
                .then((data) => {
                    // Use the data received back from the server
                    console.log(data);
                    setSuggestions([data.geonames[0]]);
                    setValue(data.geonames[0]);

                    // Process the data or update the state as needed
                })
                .catch((error) => {
                    console.error("Error sending coordinates:", error);
                });
        }
        function error() {
            console.log("Unable to retrieve your location");
        }
    };


    return (
        <>
            <Stack
                direction="row"
                divider={<Divider orientation="vertical" flexItem />}
                spacing={2}
            >

                <Autocomplete
                    id="city-search"
                    isOptionEqualToValue={(option, value) => option?.geonameId === value?.geonameId}
                    value={value}
                    onChange={(event, newValue) => {
                        setValue(newValue);
                        console.log(newValue);
                    }}
                    onInputChange={(event, newInputValue) => {
                        setSearchQuery(newInputValue);
                    }}
                    options={suggestions}
                    sx={{ width: 300 }}
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
                    renderInput={(params) => <TextField {...params} label="Search a city" />}
                    autoComplete
                    includeInputInList
                    filterSelectedOptions
                    noOptionsText="No cities found"
                />

                <Button variant="outlined" onClick={handleLocationClick}> <MyLocationIcon /> </Button>
            </Stack>

            {value && (
                <WeatherInfo longitude={value.lng} latitude={value.lat} />
            )}
        </>
    );
};

export default CitySearch;
