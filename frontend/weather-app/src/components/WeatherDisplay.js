import { useSelector } from 'react-redux';
import Slide from '@mui/material/Slide';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import CurrentWeatherBox from './CurrentWeatherBox';
import HeroSection from './header/HeroSection';
import WeatherWeekForecast from './weatherbox/WeatherWeekForecast';
import WeatherHourlyTemp from './weatherbox/WeatherHourlyTemp';
import WindCompassAirQualityBox from './weatherbox/WindCompassAirQualityBox';
import WeatherCharts from './weatherbox/WeatherCharts';
import { Typography } from '@mui/material';


const WeatherDisplay = () => {

    const isWeatherDataAvailable = useSelector((state) => state.weather.isWeatherDataAvailable);
    const weatherData = useSelector((state) => state.weather.weatherData);
    const selectedCity = useSelector((state) => state.weather.selectedCity);
    const error = useSelector((state) => state.weather.error); // error is null if no error occurred

    if (error) {
        return (
            <div>
                <p>An error occurred: {error}</p>
            </div>
        );
    }

    if (isWeatherDataAvailable && weatherData !== null && selectedCity && weatherData.daily !== undefined) {
        return (
            <>
                <Slide direction="up" in={true} mountOnEnter unmountOnExit>
                    <div style={{ marginBottom: 3, width: '100%' }}>
                        <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
                            <img
                                loading="lazy"
                                width="35"
                                src={`https://flagcdn.com/w20/${selectedCity.countryCode.toLowerCase()}.png`}
                                srcSet={`https://flagcdn.com/w40/${selectedCity.countryCode.toLowerCase()}.png 2x`}
                                alt=""
                                style={{ marginRight: 10 }}
                            />
                            {selectedCity.name}, {selectedCity.countryName}
                        </Typography>
                        <Box>
                            <Grid container spacing={2} alignItems="stretch"> {/* Grid container for the whole page */}
                                <Grid item xs={12} sm={8} >
                                    <CurrentWeatherBox cityName={selectedCity.name} today_min_temperature={weatherData.daily.apparent_temperature_min[0]} today_max_temperature={weatherData.daily.apparent_temperature_max[0]} current_weather={weatherData.current_weather} time_zone={weatherData.timezone} />
                                    <WeatherHourlyTemp />
                                    <WindCompassAirQualityBox />
                                    <WeatherCharts />
                                </Grid>
                                <Grid item xs={12} sm={4} >
                                    <WeatherWeekForecast daily={weatherData.daily} daily_units={weatherData.daily_units} /> {/* Pass daily weather data to the new component */}
                                </Grid>
                            </Grid>
                        </Box>
                    </div>
                </Slide>
            </>
        );
    } else {
        return (
            <>
                <HeroSection />
            </>
        );
    }
};

export default WeatherDisplay;