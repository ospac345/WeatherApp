import React from 'react'
import { useSelector } from "react-redux";
import { Typography, Grid, Box, Paper } from '@mui/material';
import WindCompass from './WindCompass';
import { WiStrongWind } from 'react-icons/wi';
import { useTheme } from '@mui/material/styles';
import AirQualityBox from './AirQualityBox';


const WindCompassAirQualityBox = () => {
    const weatherData = useSelector((state) => state.weather.weatherData);
    const theme = useTheme();

    return (
        <Grid container spacing={1} sx={{ marginTop: '5px' }}>
            <Grid item xs={12} sm={6} md={6} lg={6} xl={6} display="flex" alignItems="stretch">
                <Box style={{ borderWidth: 1, borderStyle: 'solid', borderColor: theme.palette.primary.main, borderRadius: '5px', padding: '5px', width: '100%' }}>
                    <Paper elevation={3} style={{ height: '100%' }}>
                        <Typography variant="h7" sx={{ fontWeight: 'bold' }}>
                            <WiStrongWind style={{ fontSize: '1.5rem', marginRight: '5px' }} />
                            Wind
                        </Typography>
                        <WindCompass windDirection={weatherData.current_weather.winddirection} windSpeed={weatherData.current_weather.windspeed} />
                    </Paper>
                </Box>
            </Grid>

            <Grid item xs={12} sm={6} md={6} lg={6} xl={6} display="flex" alignItems="stretch">
                <Box style={{ borderWidth: 1, borderStyle: 'solid', borderColor: theme.palette.primary.main, borderRadius: '5px', padding: '5px', width: '100%', height: '190px' }}>
                    <Paper elevation={3} style={{ height: '100%' }}>
                        <AirQualityBox />
                    </Paper>
                </Box>
            </Grid>
        </Grid>
    )
}

export default WindCompassAirQualityBox;

