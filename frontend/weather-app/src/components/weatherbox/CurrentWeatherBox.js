import React from 'react';
import '../../styleSheets/WeatherIconStyles.css';
import { Grid, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import LocalTimeComponent from './LocalTimeComponent';
import InterpretWeatherCode from './InterpretWeatherCode';
import { useSelector } from "react-redux";
import { useTheme } from '@mui/material/styles';

const CurrentWeatherBox = ({ current_weather, today_min_temperature, today_max_temperature, time_zone, cityName }) => {
    const tempUnit = useSelector((state) => state.weather.tempUnit);
    const theme = useTheme();

    let dayOrNightClass;
    let currentWeatherTime = current_weather.time.split('T')[1]

    const weatherInfo = InterpretWeatherCode(current_weather.weathercode);
    const { dayIcon, nightIcon, weatherTextDay, weatherTextNight } = weatherInfo;

    dayOrNightClass = current_weather.is_day ? 'day' : 'night';

    const tempUnitLogoConverter = (temp) => {
        if (temp === 'celsius') {
            return `C`;
        } else if (temp === 'fahrenheit') {
            return `F`;
        }
    }

    return (
        <div className={`weather-container ${dayOrNightClass}`} style={{ border: `${theme.palette.primary.main} 1px solid`, borderRadius: '5px' }}>
            <Grid container justifyContent="space-between" style={{ padding: 10 }}>
                <div className='icons-stack'>
                    <LocalTimeComponent time_zone={time_zone} isDay={current_weather.is_day} />
                    <img src={current_weather.is_day ? dayIcon : nightIcon} alt="weather" />
                    <div className="weather-text">{current_weather.is_day ? weatherTextDay : weatherTextNight}</div>
                    <div style={{ color: grey, fontSize: 12 }}>Updated: {currentWeatherTime}</div>
                </div>

                <div>
                    <span className='current-temp-number' style={{ color: theme.palette.secondary.main, fontWeight: 'bold' }}>{current_weather.temperature}°<span style={{ fontSize: '25px' }}>{tempUnitLogoConverter(tempUnit)}</span></span>
                    <div style={{ fontWeight: 'bold', display: 'flex', justifyContent: 'space-around' }}>
                        <Typography>H: <span style={{ color: theme.palette.secondary.main }}>{today_max_temperature}°</span></Typography>
                        <Typography>L: <span style={{ color: theme.palette.secondary.main }}>{today_min_temperature}°</span></Typography>
                    </div>
                </div>
            </Grid>
        </div>
    );
};

export default CurrentWeatherBox;
