import React from 'react';
import { WiDaySunny, WiCloudy, WiFog, WiRain, WiSnow, WiThunderstorm, WiMoonWaningCrescent5 } from 'react-icons/wi';
import '../styleSheets/WeatherIconStyles.css';
import { Grid } from '@mui/material';
import { grey } from '@mui/material/colors';
import LocalTimeComponent from './LocalTimeComponent';

const CurrentWeatherBox = ({ current_weather, today_min_temperature, today_max_temperature, time_zone }) => {
    let dayIcon;
    let nightIcon;
    let dayOrNightClass;
    let weatherText;
    let weatherClass;

    switch (current_weather.weathercode) {
        case 0:
            dayIcon = <WiDaySunny />;
            nightIcon = <WiMoonWaningCrescent5 />;
            weatherText = 'Clear Sky';
            weatherClass = 'clear-sky';
            break;
        case 1:
        case 2:
        case 3:
            dayIcon = <WiCloudy />;
            nightIcon = <WiCloudy />;
            weatherText = 'Mainly Clear / Partly Cloudy / Overcast';
            weatherClass = 'partly-cloudy';
            break;
        case 45:
        case 48:
            dayIcon = <WiFog />;
            nightIcon = <WiFog />;
            weatherText = 'Fog and Deposition Rime Fog';
            break;
        case 51:
        case 53:
        case 55:
            dayIcon = <WiRain />;
            nightIcon = <WiRain />;
            weatherText = 'Drizzle: Light / Moderate / Dense Intensity';
            break;
        case 56:
        case 57:
            dayIcon = <WiRain />;
            nightIcon = <WiRain />;
            weatherText = 'Freezing Drizzle: Light / Dense Intensity';
            break;
        case 61:
        case 63:
        case 65:
            dayIcon = <WiRain />;
            nightIcon = <WiRain />;
            weatherText = 'Rain: Slight / Moderate / Heavy Intensity';
            break;
        case 66:
        case 67:
            dayIcon = <WiRain />;
            nightIcon = <WiRain />;
            weatherText = 'Freezing Rain: Light / Heavy Intensity';
            break;
        case 71:
        case 73:
        case 75:
            dayIcon = <WiSnow />;
            nightIcon = <WiSnow />;
            weatherText = 'Snowfall: Slight / Moderate / Heavy Intensity';
            break;
        case 77:
            dayIcon = <WiSnow />;
            nightIcon = <WiSnow />;
            weatherText = 'Snow Grains';
            break;
        case 80:
        case 81:
        case 82:
            dayIcon = <WiRain />;
            nightIcon = <WiRain />;
            weatherText = 'Rain Showers: Slight / Moderate / Violent';
            break;
        case 85:
        case 86:
            dayIcon = <WiSnow />;
            nightIcon = <WiSnow />;
            weatherText = 'Snow Showers: Slight / Heavy';
            break;
        case 95:
            dayIcon = <WiThunderstorm />;
            nightIcon = <WiThunderstorm />;
            weatherText = 'Thunderstorm: Slight or Moderate';
            break;
        case 96:
        case 99:
            dayIcon = <WiThunderstorm />;
            nightIcon = <WiThunderstorm />;
            weatherText = 'Thunderstorm with Slight / Heavy Hail';
            break;
        default:
            dayIcon = null;
            nightIcon = null;
            weatherText = 'Unknown Weather';
            break;
    }


    dayOrNightClass = current_weather.is_day ? 'day' : 'night';

    return (
        <div className={`weather-container ${dayOrNightClass} ${weatherClass}`}>
            <Grid container justifyContent="space-between" style={{ padding: 10 }}>
                <div className='icons-stack'>
                    <LocalTimeComponent time_zone={time_zone} isDay={current_weather.is_day} />
                    <div className="weather-icon">{current_weather.is_day ? dayIcon : nightIcon}</div>
                    <div className="weather-text">{weatherText}</div>
                    <div style={{ color: grey, fontSize: 12 }}>As of 00:00PM</div>
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
