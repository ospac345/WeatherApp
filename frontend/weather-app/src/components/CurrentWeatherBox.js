import React from 'react';
import '../styleSheets/WeatherIconStyles.css';
import { Grid } from '@mui/material';
import { grey } from '@mui/material/colors';
import LocalTimeComponent from './LocalTimeComponent';
import InterpretWeatherCode from './InterpretWeatherCode';

const CurrentWeatherBox = ({ current_weather, today_min_temperature, today_max_temperature, time_zone, cityName }) => {

    let dayOrNightClass;
    let currentWeatherTime = current_weather.time.split('T')[1]

    const weatherInfo = InterpretWeatherCode(current_weather.weathercode);
    const { dayIcon, nightIcon, weatherTextDay, weatherTextNight } = weatherInfo;

    dayOrNightClass = current_weather.is_day ? 'day' : 'night';

    return (
        <div className={`weather-container ${dayOrNightClass}`}>
            <Grid container justifyContent="space-between" style={{ padding: 10 }}>
                <div className='icons-stack'>
                    <LocalTimeComponent time_zone={time_zone} isDay={current_weather.is_day} />
                    <img src={current_weather.is_day ? dayIcon : nightIcon} alt="Weather Image" />
                    <div className="weather-text">{current_weather.is_day ? weatherTextDay : weatherTextNight}</div>
                    <div style={{ color: grey, fontSize: 12 }}>{cityName} as of {currentWeatherTime}</div>
                </div>

                <div>
                    <span className='current-temp-number'>{current_weather.temperature}°</span>
                    <div style={{ fontWeight: 'bold' }}>
                        <span>H:{today_max_temperature}° </span>
                        <span>L:{today_min_temperature}°</span>
                    </div>
                </div>
            </Grid>
        </div>
    );
};

export default CurrentWeatherBox;
