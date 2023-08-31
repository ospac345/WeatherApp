import { useSelector } from 'react-redux';
import Slide from '@mui/material/Slide';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import CurrentWeatherBox from './CurrentWeatherBox';
import HeroSection from './header/HeroSection';


const WeatherDisplay = () => {

    const isWeatherDataAvailable = useSelector((state) => state.weather.isWeatherDataAvailable);
    const weatherData = useSelector((state) => state.weather.weatherData);
    const selectedCity = useSelector((state) => state.weather.selectedCity);

    if (isWeatherDataAvailable === true) {
        return (
            <>
                <Slide direction="up" in={true} mountOnEnter unmountOnExit>
                    <div>
                        <Box>

                            <Grid sx={{ alignItems: 'center' }} item xs={12} sm={6} style={{ marginTop: 10 }}>
                                <CurrentWeatherBox cityName={selectedCity.name} today_min_temperature={weatherData.daily.apparent_temperature_min[0]} today_max_temperature={weatherData.daily.apparent_temperature_max[0]} current_weather={weatherData.current_weather} time_zone={weatherData.timezone} />
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