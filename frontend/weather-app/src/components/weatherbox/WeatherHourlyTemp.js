import React, { useRef } from 'react';
import { useSelector } from 'react-redux';
import { Typography, Grid, Box, Paper } from '@mui/material';
import { useDraggable } from "react-use-draggable-scroll";
import InterpretWeatherCode from '../InterpretWeatherCode';
import { useTheme } from '@mui/material/styles';
import { WiRaindrop } from 'react-icons/wi';
import '../../styleSheets/WeatherIconStyles.css';

const WeatherHourlyTemp = () => {
    const weatherData = useSelector((state) => state.weather.weatherData);
    const theme = useTheme();

    const ref = useRef();
    const { events } = useDraggable(ref, {
        applyRubberBandEffect: true,
    });

    const dayOrNightIcon = (weathercode, isDay) => {
        const { dayIcon, nightIcon } = InterpretWeatherCode(weathercode);
        if (isDay) {
            return dayIcon;
        } else {
            return nightIcon;
        }
    }

    const tempRounder = (temp) => {
        return Math.round(temp);
    }

    // Function to format the hour in the specified time zone
    function formatHour(date, timeZone) {
        const formattedDate = new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', timeZone });
        return formattedDate;
    }

    // Define the target time zone (e.g., Lahore, Pakistan)
    const timeZone = weatherData.timezone // Use the correct time zone identifier

    // Calculate the current time in the specified time zone
    const now = new Date();
    const currentHourIndex = weatherData.hourly.time.findIndex(date => {
        const hour = new Date(date).toLocaleTimeString([], { hour: '2-digit', timeZone });
        return hour === now.toLocaleTimeString([], { hour: '2-digit', timeZone });
    });

    // Filter the data for the next 24 hours starting from the current hour
    const next24HoursData = weatherData.hourly.time.slice(currentHourIndex, currentHourIndex + 24);

    return (
        <>
            <Grid {...events} ref={ref} style={{
                overflowX: 'scroll',
                display: 'flex',
                alignItems: 'center',
                /* For IE and Edge */
                msOverflowStyle: 'none',
                /* For Firefox */
                scrollbarWidth: 'none',
                WebkitScrollbar: {
                    display: 'none',
                },
                border: `${theme.palette.primary.main} 1px solid`,
                borderRadius: '5px',
                marginTop: '10px',

            }}>
                {next24HoursData.map((date, index) => (
                    <Box sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        m: 1,
                    }} key={index}>
                        <Paper elevation={3} style={{ padding: '15px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <Typography sx={index === 0 ? { fontWeight: 'bold' } : {}}>{index === 0 ? 'Now' : formatHour(date, timeZone)}</Typography>
                            <Typography
                                sx={{
                                    color: theme.palette.secondary.main,
                                    fontSize: '25px',
                                    fontWeight: index === 0 ? 'bold' : 'normal' // Apply fontWeight conditionally
                                }}
                            >
                                {tempRounder(weatherData.hourly.temperature_2m[currentHourIndex + index])}°
                            </Typography>

                            <img className='weather-hourly-temp-images' style={{ width: 55 }} src={dayOrNightIcon(weatherData.hourly.weathercode[currentHourIndex + index], weatherData.hourly.is_day[currentHourIndex + index])} alt='weather icon'></img>
                            <Typography sx={{ fontSize: '13px' }}><WiRaindrop style={{ color: theme.palette.primary.main }} />{(weatherData.hourly.precipitation_probability[currentHourIndex + index])}%</Typography>
                        </Paper>
                    </Box>
                ))}
            </Grid>
        </>
    );
}

export default WeatherHourlyTemp;


