import React from 'react';
import CitySearch from './CitySearch';
import Container from '@mui/material/Container';
import '../styleSheets/WeatherIconStyles.css'


function MainPage() {

    return (

        <>
            <div className='main-container-body-div'>
                <Container maxWidth="sm" style={{ padding: 10 }}>
                    <div class="logo-parent-box">
                        <div class="logo">
                            <span class="logo-text">WeatherWise</span>
                        </div>
                    </div>

                    <CitySearch />
                </Container>

            </div>
        </>

    );
}

export default MainPage;