import React from 'react';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import Grid from '@mui/material/Grid';
import { TypeAnimation } from 'react-type-animation';
import '../../styleSheets/HeroSectionStyles.css';
import { styled } from '@mui/system';
import heroGifImage from '../images/hero-img-4.WEBP'


const AnimationContainer = styled('div')({
    fontSize: '2em',
    display: 'inline-block',
});

const ImageBox = styled('div')({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
});

const HeroImg = styled('img')({
    maxWidth: '100%',
    height: 'auto',
});

const HeroSection = () => {

    return (

        <div>
            <Grid
                container
                justifyContent="space-around"
                alignItems="center"
                spacing={3}
                columns={{ xs: 12, sm: 6, md: 12 }} // Adjust the breakpoints here
            >
                <Grid item xs={12} sm={6} md={6}>
                    <Typography
                        variant="h2"
                        component="h2"
                        gutterBottom
                        style={{ fontSize: '4.2rem', fontWeight: '700', letterSpacing: '0.1em', lineHeight: '1.05' }}
                    > Search for weather in
                    </Typography>
                    <AnimationContainer style={{ color: '#d35400' }}>
                        <TypeAnimation
                            sequence={[
                                'London',
                                1000,
                                'Paris',
                                2000,
                                'New York',
                                2000,
                                'Tokyo',
                                2000,
                                'Berlin',
                                2000,
                                'Moscow',
                                2000,
                                'Madrid',
                                2000,
                                'Rome',
                                2000,
                                'Sydney',
                                2000,
                                'Cairo',
                                2000,
                                'Beijing',
                                2000,
                                'Rio de Janeiro',
                                2000,
                                'Los Angeles',
                                2000,
                                'Buenos Aires',
                                2000,
                                'Mexico City',
                                2000,
                                'Toronto',
                                2000,
                                'Chicago',
                                2000,
                                'Houston',
                            ]}
                            wrapper="span"
                            cursor={true}
                            repeat={Infinity}
                        />
                    </AnimationContainer>
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                    <ImageBox>
                        <div className="hero-img-box">
                            <HeroImg
                                src={heroGifImage}
                                alt="Woman enjoying food, meals in storage container, and food bowls on a table"
                            />
                        </div>
                    </ImageBox>
                </Grid>
            </Grid>
        </div>
    );
};

export default HeroSection;
