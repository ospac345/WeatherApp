import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Typography, Grid, CircularProgress, Box, Paper } from '@mui/material';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { fetchAirQualityData } from "../../actions/weatherActions";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';


const AirQualityBox = () => {
    const weatherData = useSelector((state) => state.weather.weatherData);
    const airQualityData = useSelector((state) => state.weather.airQualityData);
    const error = useSelector((state) => state.weather.error);
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        dispatch(fetchAirQualityData(weatherData.latitude, weatherData.longitude))
            .then(() => setIsLoading(false)) // Set loading to false when data is fetched
            .catch(error => {
                setIsLoading(false); // Set loading to false on error as well
            });
    }, [dispatch, weatherData.latitude, weatherData.longitude]);

    let currentHourIndex;

    if (airQualityData?.hourly?.time) {
        const timeZone = weatherData.timezone;
        const now = new Date();
        currentHourIndex = airQualityData.hourly.time.findIndex(date => {
            const hour = new Date(date).toLocaleTimeString([], { hour: '2-digit', timeZone });
            return hour === now.toLocaleTimeString([], { hour: '2-digit', timeZone });
        });
    }

    const concentrationRanges = {
        pm25: [11, 23, 35, 41, 47, 53, 58, 64, 70, 71], // µg/m³ for PM2.5
        pm10: [16, 33, 50, 58, 66, 75, 83, 91, 100, 101], // µg/m³ for PM10
        no2: [67, 134, 200, 267, 334, 400, 467, 534, 600, 601], // µg/m³ for NO2
        o3: [33, 66, 100, 120, 140, 160, 187, 213, 240, 241], // µg/m³ for O3
        so2: [88, 177, 266, 354, 443, 532, 710, 887, 1064, 1065] // µg/m³ for SO2
    };


    const getAirPollutionBanding = (value, pollutant) => {
        const ranges = concentrationRanges[pollutant];

        if (value <= ranges[0]) {
            return [1, 'Low', '#00FF00', 'Good', 'You can go outside and play!'];
        }
        if (value <= ranges[1]) {
            return [2, 'Low', '#33CC33', 'Fair', 'It\'s still safe to go outside.'];
        }
        if (value <= ranges[2]) {
            return [3, 'Low', '#669966', 'Moderate', 'Outdoor activities are generally safe.'];
        }
        if (value <= ranges[3]) {
            return [4, 'Moderate', '#FFFF00', 'Poor', 'Limit outdoor activities, especially if you have respiratory conditions.'];
        }
        if (value <= ranges[4]) {
            return [5, 'Moderate', '#FFCC00', 'Fair', 'Limit outdoor activities, especially if you have respiratory conditions.'];
        }
        if (value <= ranges[5]) {
            return [6, 'Moderate', '#FF9933', 'Poor', 'Limit outdoor activities, especially if you have respiratory conditions.'];
        }
        if (value <= ranges[6]) {
            return [7, 'High', '#FF8000', 'Moderate', 'Avoid outdoor activities if you have respiratory conditions.'];
        }
        if (value <= ranges[7]) {
            return [8, 'High', '#FF6600', 'Poor', 'Avoid outdoor activities if you have respiratory conditions.'];
        }
        if (value <= ranges[8]) {
            return [9, 'High', '#FF3300', 'Very Poor', 'Avoid outdoor activities, especially if you have respiratory conditions.'];
        }
        if (value >= ranges[9]) {
            return [10, 'Very High', '#FF0000', 'Extremely Poor', 'Stay indoors and avoid outdoor activities.'];
        }
    };

    if (isLoading) {
        return (
            <CircularProgress />
        );
    }

    if (error) {
        return (
            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                Error getting Air Quality results: {error}
            </Typography>
        );
    }

    return (
        <>
            {airQualityData?.hourly ? (
                <>

                    <Typography variant="h7" sx={{ fontWeight: 'bold', marginLeft: '5px' }}>
                        Air Quality Index
                    </Typography>

                    <Swiper
                        style={{ width: '100%', height: '85%' }}
                        pagination={{
                            dynamicBullets: true,
                        }}
                        modules={[Pagination]}
                        className="mySwiper"
                    >

                        <>
                            <SwiperSlide
                                style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}
                            >
                                <Box style={{ display: 'flex', width: '100%', justifyContent: 'space-around' }}>
                                    <div style={{ width: '27%', minWidth: '27%', padding: '5px' }}>
                                        <CircularProgressbar
                                            value={getAirPollutionBanding(airQualityData.hourly.pm2_5[currentHourIndex], 'pm25')[0]}
                                            text={`${getAirPollutionBanding(airQualityData.hourly.pm2_5[currentHourIndex], 'pm25')[0]}`}
                                            maxValue={10}

                                            styles={{
                                                path: {
                                                    stroke: getAirPollutionBanding(airQualityData.hourly.pm2_5[currentHourIndex], 'pm25')[2],
                                                    strokeLinecap: 'butt',
                                                    // Customize transition animation
                                                    transition: 'stroke-dashoffset 0.5s ease 0s',
                                                    // Rotate the path
                                                    transform: 'rotate(0.25turn)',
                                                    transformOrigin: 'center center',
                                                },
                                                trail: {
                                                    stroke: '#d6d6d6',
                                                    strokeLinecap: 'butt',
                                                    strokeLinejoin: 'butt',
                                                },
                                            }} />
                                    </div>
                                    <div style={{ padding: '5px', display: 'flex', flexDirection: 'column' }}>
                                        <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                                            {getAirPollutionBanding(airQualityData.hourly.pm2_5[currentHourIndex], 'pm25')[1]}
                                        </Typography>
                                        <Typography variant="subtitle2">
                                            PM2.5 (Particulate matter less than 2.5 microns)
                                        </Typography>
                                        <Typography variant="caption" sx={{ opacity: '0.5' }}>
                                            {airQualityData.hourly.pm2_5[currentHourIndex]} {airQualityData.hourly_units.pm2_5}
                                        </Typography>
                                    </div>
                                </Box>
                            </SwiperSlide>

                            <SwiperSlide
                                style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}
                            >
                                <Box style={{ display: 'flex', width: '100%', justifyContent: 'space-around' }}>
                                    <div style={{ width: '27%', minWidth: '27%', padding: '5px' }}>
                                        <CircularProgressbar
                                            value={getAirPollutionBanding(airQualityData.hourly.pm10[currentHourIndex], 'pm10')[0]}
                                            text={`${getAirPollutionBanding(airQualityData.hourly.pm10[currentHourIndex], 'pm10')[0]}`}
                                            maxValue={10}

                                            styles={{
                                                path: {
                                                    stroke: getAirPollutionBanding(airQualityData.hourly.pm10[currentHourIndex], 'pm10')[2],
                                                    strokeLinecap: 'butt',
                                                    // Customize transition animation
                                                    transition: 'stroke-dashoffset 0.5s ease 0s',
                                                    // Rotate the path
                                                    transform: 'rotate(0.25turn)',
                                                    transformOrigin: 'center center',
                                                },
                                                trail: {
                                                    stroke: '#d6d6d6',
                                                    strokeLinecap: 'butt',
                                                    strokeLinejoin: 'butt',
                                                },
                                            }} />
                                    </div>
                                    <div style={{ padding: '5px', display: 'flex', flexDirection: 'column' }}>
                                        <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                                            {getAirPollutionBanding(airQualityData.hourly.pm10[currentHourIndex], 'pm10')[1]}
                                        </Typography>
                                        <Typography variant="subtitle2">
                                            PM10 (Particulate matter less than 10 microns)
                                        </Typography>
                                        <Typography variant="caption" sx={{ opacity: '0.5' }}>
                                            {airQualityData.hourly.pm10[currentHourIndex]} {airQualityData.hourly_units.pm10}
                                        </Typography>
                                    </div>
                                </Box>
                            </SwiperSlide>

                            <SwiperSlide
                                style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}
                            >
                                <Box style={{ display: 'flex', width: '100%', justifyContent: 'space-around' }}>
                                    <div style={{ width: '27%', minWidth: '27%', padding: '5px' }}>
                                        <CircularProgressbar
                                            value={getAirPollutionBanding(airQualityData.hourly.ozone[currentHourIndex], 'o3')[0]}
                                            text={`${getAirPollutionBanding(airQualityData.hourly.ozone[currentHourIndex], 'o3')[0]}`}
                                            maxValue={10}

                                            styles={{
                                                path: {
                                                    stroke: getAirPollutionBanding(airQualityData.hourly.ozone[currentHourIndex], 'o3')[2],
                                                    strokeLinecap: 'butt',
                                                    // Customize transition animation
                                                    transition: 'stroke-dashoffset 0.5s ease 0s',
                                                    // Rotate the path
                                                    transform: 'rotate(0.25turn)',
                                                    transformOrigin: 'center center',
                                                },
                                                trail: {
                                                    stroke: '#d6d6d6',
                                                    strokeLinecap: 'butt',
                                                    strokeLinejoin: 'butt',
                                                },
                                            }} />
                                    </div>
                                    <div style={{ padding: '5px', display: 'flex', flexDirection: 'column' }}>
                                        <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                                            {getAirPollutionBanding(airQualityData.hourly.ozone[currentHourIndex], 'o3')[1]}
                                        </Typography>
                                        <Typography variant="subtitle2">
                                            O3 (Ozone)
                                        </Typography>
                                        <Typography variant="caption" sx={{ opacity: '0.5' }}>
                                            {airQualityData.hourly.ozone[currentHourIndex]} {airQualityData.hourly_units.ozone}
                                        </Typography>
                                    </div>
                                </Box>
                            </SwiperSlide>

                            <SwiperSlide
                                style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}
                            >
                                <Box style={{ display: 'flex', width: '100%', justifyContent: 'space-around' }}>
                                    <div style={{ width: '27%', minWidth: '27%', padding: '5px' }}>
                                        <CircularProgressbar
                                            value={getAirPollutionBanding(airQualityData.hourly.nitrogen_dioxide[currentHourIndex], 'no2')[0]}
                                            text={`${getAirPollutionBanding(airQualityData.hourly.nitrogen_dioxide[currentHourIndex], 'no2')[0]}`}
                                            maxValue={10}

                                            styles={{
                                                path: {
                                                    stroke: getAirPollutionBanding(airQualityData.hourly.nitrogen_dioxide[currentHourIndex], 'no2')[2],
                                                    strokeLinecap: 'butt',
                                                    // Customize transition animation
                                                    transition: 'stroke-dashoffset 0.5s ease 0s',
                                                    // Rotate the path
                                                    transform: 'rotate(0.25turn)',
                                                    transformOrigin: 'center center',
                                                },
                                                trail: {
                                                    stroke: '#d6d6d6',
                                                    strokeLinecap: 'butt',
                                                    strokeLinejoin: 'butt',
                                                },
                                            }} />
                                    </div>
                                    <div style={{ padding: '5px', display: 'flex', flexDirection: 'column' }}>
                                        <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                                            {getAirPollutionBanding(airQualityData.hourly.nitrogen_dioxide[currentHourIndex], 'no2')[1]}
                                        </Typography>
                                        <Typography variant="subtitle2">
                                            NO2 (Nitrogen dioxide)
                                        </Typography>
                                        <Typography variant="caption" sx={{ opacity: '0.5' }}>
                                            {airQualityData.hourly.nitrogen_dioxide[currentHourIndex]} {airQualityData.hourly_units.nitrogen_dioxide}
                                        </Typography>
                                    </div>
                                </Box>
                            </SwiperSlide>

                            <SwiperSlide
                                style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}
                            >
                                <Box style={{ display: 'flex', width: '100%', justifyContent: 'space-around' }}>
                                    <div style={{ width: '27%', minWidth: '27%', padding: '5px' }}>
                                        <CircularProgressbar
                                            value={getAirPollutionBanding(airQualityData.hourly.sulphur_dioxide[currentHourIndex], 'so2')[0]}
                                            text={`${getAirPollutionBanding(airQualityData.hourly.sulphur_dioxide[currentHourIndex], 'so2')[0]}`}
                                            maxValue={10}

                                            styles={{
                                                path: {
                                                    stroke: getAirPollutionBanding(airQualityData.hourly.sulphur_dioxide[currentHourIndex], 'so2')[2],
                                                    strokeLinecap: 'butt',
                                                    // Customize transition animation
                                                    transition: 'stroke-dashoffset 0.5s ease 0s',
                                                    // Rotate the path
                                                    transform: 'rotate(0.25turn)',
                                                    transformOrigin: 'center center',
                                                },
                                                trail: {
                                                    stroke: '#d6d6d6',
                                                    strokeLinecap: 'butt',
                                                    strokeLinejoin: 'butt',
                                                },
                                            }} />
                                    </div>
                                    <div style={{ padding: '5px', display: 'flex', flexDirection: 'column' }}>
                                        <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                                            {getAirPollutionBanding(airQualityData.hourly.sulphur_dioxide[currentHourIndex], 'so2')[1]}
                                        </Typography>
                                        <Typography variant="subtitle2">
                                            SO2 (Sulphur dioxide)
                                        </Typography>
                                        <Typography variant="caption" sx={{ opacity: '0.5' }}>
                                            {airQualityData.hourly.sulphur_dioxide[currentHourIndex]} {airQualityData.hourly_units.sulphur_dioxide}
                                        </Typography>
                                    </div>
                                </Box>
                            </SwiperSlide>
                        </>

                    </Swiper></>
            ) : (
                <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                    No Air Quality data available
                </Typography>
            )
            }
        </>
    );
}

export default AirQualityBox;
