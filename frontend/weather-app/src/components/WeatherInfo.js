import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';


const WeatherInfo = (props) => {
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchWeather = async () => {
            setLoading(true);
            try {
                const response = await fetch('http://localhost:3001/api/weather', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ lat: props.latitude, lng: props.longitude }),
                });
                if (response.ok) {
                    const data = await response.json();
                    console.log(data);
                    if (data) {
                        setWeather(data);
                    } else {
                        setWeather(null);
                    }
                } else {
                    throw new Error('Request failed');
                }
            } catch (error) {
                console.error('Error fetching weather:', error);
                setError(error);
            } finally {
                setLoading(false);
            }
        };
        fetchWeather();
    }, [props.latitude, props.longitude]);
    return (
        <>
            {loading && <p>Loading...</p>}
            {error && <p>Error fetching weather: {error.toString()}</p>}
            {weather && (
                <div>
                    <Box sx={{ flexGrow: 1 }}>

                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6} >
                                <h5>Time Zone {weather.timezone}</h5>
                            </Grid>
                            <Grid item xs={12} sm={6} >
                                <h5>Current Temperature {weather.current_weather.temperature}°C</h5>
                            </Grid>
                        </Grid>
                    </Box>


                </div>
            )}
        </>
    );

}

export default WeatherInfo;