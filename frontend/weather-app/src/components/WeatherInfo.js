import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import CurrentWeatherBox from './CurrentWeatherBox';


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
                    <Box>

                        <Grid sx={{ alignItems: 'center' }} item xs={12} sm={6} style={{ marginTop: 10 }}>
                            <CurrentWeatherBox today_min_temperature={weather.daily.apparent_temperature_min[0]} today_max_temperature={weather.daily.apparent_temperature_max[0]} current_weather={weather.current_weather} time_zone={weather.timezone} />
                        </Grid>
                    </Box>


                </div>
            )}
        </>
    );

}

export default WeatherInfo;