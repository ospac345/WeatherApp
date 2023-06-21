import React from 'react';
import CitySearch from './CitySearch';
import Container from '@mui/material/Container';


function MainPage() {


    return (
        <Container maxWidth="sm">
            <h1>Weather App</h1>
            <p>Enter a city name below to get the current weather conditions.</p>
            <CitySearch />
        </Container>

    );
}

export default MainPage;