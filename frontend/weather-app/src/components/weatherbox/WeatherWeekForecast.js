
import { Typography, Box, Grid, Card, CardContent } from '@mui/material';
import InterpretWeatherCode from '../InterpretWeatherCode';
import { WiSunrise, WiSunset } from "react-icons/wi";
import { useTheme } from '@mui/material/styles';



const WeatherWeekForecast = ({ daily_units, daily }) => {
    const theme = useTheme();

    const dayIcon = (weathercode) => {
        const { dayIcon } = InterpretWeatherCode(weathercode);
        return dayIcon;
    }

    const weatherCodeToText = (weathercode) => {
        const { weatherTextDay } = InterpretWeatherCode(weathercode);
        return weatherTextDay;
    }


    const weekdayToToday = (weekday) => {
        const today = new Date();
        const weatherDate = new Date(weekday);

        if (
            today.getDate() === weatherDate.getDate() &&
            today.getMonth() === weatherDate.getMonth() &&
            today.getFullYear() === weatherDate.getFullYear()
        ) {
            return 'Today';
        } else {
            return new Date(weekday).toLocaleDateString('en-US', { weekday: 'short' });
        }
    };

    return (
        <>
            <Box
                style={{ borderWidth: 1, borderStyle: 'solid', borderColor: theme.palette.primary.main, borderRadius: '5px', padding: '5px' }}
            >
                {daily.time.map((date, index) => (
                    <Card raised={true} key={date} elevation={2} style={{ padding: '3px', margin: '3px' }}>
                        <CardContent>
                            <Grid container direction='row'
                                justifyContent='space-between' alignItems='center'
                            >
                                <Typography variant="h7">
                                    <span style={{ fontWeight: 'bold', color: theme.palette.text.primary }}>
                                        {weekdayToToday(date)}
                                    </span>
                                </Typography>
                                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    <img style={{ width: 60 }} src={dayIcon(daily.weathercode[index])} alt="weatherCode"></img>
                                    <Typography variant="body2">
                                        {weatherCodeToText(daily.weathercode[index])}
                                    </Typography>
                                </div>

                                <Typography variant="body2" sx={{ color: theme.palette.secondary.main }}>
                                    <span style={{ fontWeight: 'bold' }}>{daily.apparent_temperature_max[index]}°</span> / <span style={{ opacity: '0.6' }}>{daily.apparent_temperature_min[index]}°</span>
                                </Typography>
                            </Grid>
                            <Grid container direction='row'
                                justifyContent='space-between' alignItems='center'>
                                <Typography variant="body2">
                                    <WiSunrise size={25} /> {new Date(daily.sunrise[index]).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })}
                                </Typography>
                                <Typography variant="body2">
                                    <WiSunset size={25} /> {new Date(daily.sunset[index]).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })}
                                </Typography>


                            </Grid>
                        </CardContent>

                    </Card>
                ))}
            </Box>
        </>

    );
}

export default WeatherWeekForecast;