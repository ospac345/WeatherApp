import React from 'react';
import CitySearch from './CitySearch';
import Container from '@mui/material/Container';
import '../styleSheets/WeatherIconStyles.css'
import DrawerAppBar from './header/DrawerAppBar';
import Box from '@mui/material/Box';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import WeatherDisplay from './WeatherDisplay';
import FooterComponent from './footer/FooterComponent';
import HeroSection from './header/HeroSection';

export const ColorModeContext = React.createContext();

function MainPage() {

    const [mode, setMode] = React.useState('light');

    const colorMode = React.useMemo(
        () => ({
            toggleColorMode: () => {
                setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
            },
        }),
        [],
    );

    const theme = React.useMemo(
        () =>
            createTheme({
                palette: {
                    mode,
                },
            }),
        [mode],
    );


    return (
        <>
            <ColorModeContext.Provider value={colorMode}>
                <ThemeProvider theme={theme}>
                    <Box
                        sx={{
                            display: 'flex',
                            width: '100%',
                            alignItems: 'center',
                            justifyContent: 'center',
                            bgcolor: 'background.default',
                            color: 'text.primary',
                        }}
                    >
                        <Container maxWidth="xl" style={{}} disableGutters>

                            <DrawerAppBar />
                            <CitySearch />
                            <WeatherDisplay />
                            <FooterComponent />

                        </Container>
                    </Box>
                </ThemeProvider>
            </ColorModeContext.Provider>
        </>

    );
}

export default MainPage;