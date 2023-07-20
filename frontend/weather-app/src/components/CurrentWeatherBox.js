import React from 'react';
import { WiDaySunny, WiCloudy, WiFog, WiRain, WiSnow, WiThunderstorm, WiMoonWaningCrescent5 } from 'react-icons/wi';
import '../styleSheets/WeatherIconStyles.css'
import { Grid } from '@mui/material';

const CurrentWeatherBox = ({ current_weather, today_min_temperature, today_max_temperature }) => {
    let icon;
    let weatherClass;
    let weatherText;

    const backgroundIcon = current_weather.isDay ? <WiDaySunny /> : <WiMoonWaningCrescent5 />;

    switch (current_weather.weathercode) {
        case 0:
            icon = <WiDaySunny />;
            weatherClass = 'clear-sky';
            weatherText = 'Clear Sky';
            break;
        case 1:
        case 2:
        case 3:
            icon = <WiCloudy />;
            weatherClass = 'partly-cloudy';
            weatherText = 'Partly Cloudy';
            break;
        case 45:
        case 48:
            icon = <WiFog />;
            weatherClass = 'fog';
            weatherText = 'Fog';
            break;
        case 51:
        case 53:
        case 55:
            icon = <WiRain />;
            weatherClass = 'drizzle';
            weatherText = 'Drizzle';
            break;
        case 56:
        case 57:
            icon = <WiRain />;
            weatherClass = 'freezing-drizzle';
            weatherText = 'Freezing Drizzle';
            break;
        // ... rest of the cases

        default:
            icon = null;
            weatherClass = 'default';
            weatherText = 'Unknown Weather';
            break;
    }

    return (
        <div className={`weather-container ${weatherClass}`}>
            <Grid container justifyContent="space-between" style={{ padding: 10 }}>
                <div className='icons-stack'>
                    {/* Display the background sun or moon icon */}
                    <div className="weather-icon-background">{backgroundIcon}</div>

                    {/* Display the front weather icon and weather text */}
                    <div className="weather-icon">{icon}</div>
                    <div className="weather-text">{weatherText}</div>
                </div>

                <div>
                    <span className='current-temp-number'>{current_weather.temperature}</span>°C
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
