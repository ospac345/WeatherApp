import Container from '@mui/material/Container';
import DrawerAppBar from './header/DrawerAppBar';
import Box from '@mui/material/Box';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import WeatherDisplay from './WeatherDisplay';
import FooterComponent from './footer/FooterComponent';
import { useState, useEffect, useMemo, createContext } from 'react';

export const ColorModeContext = createContext();

function MainPage() {
    const [mode, setMode] = useState(localStorage.getItem('theme') || 'light');

    useEffect(() => {
        localStorage.setItem('theme', mode);
    }, [mode]);

    const colorMode = useMemo(
        () => ({
            toggleColorMode: () => {
                setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
            },
        }),
        [],
    );

    const theme = useMemo(
        () =>
            createTheme({
                palette: {
                    mode,
                    primary: {
                        main: mode === 'light' ? '#3498db' : '#2980b9',
                    },
                    secondary: {
                        main: mode === 'light' ? '#e74c3c' : '#d35400',
                    },
                    background: {
                        default: mode === 'light' ? '#f7f7f7' : '#222222',
                    },
                    text: {
                        primary: mode === 'light' ? '#333333' : '#ffffff',
                    },
                    error: {
                        main: '#FF6347',
                    },
                    divider: '#4169E1',
                    footer: {
                        background: mode === 'light' ? '#f0f0f0' : '#333333', // Light gray in light mode, Dark gray in dark mode
                        text: mode === 'light' ? '#555555' : '#cccccc', // Dark gray text in light mode, Light gray text in dark mode
                    }
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
                        <Container maxWidth="xl">
                            <DrawerAppBar />
                            <WeatherDisplay />
                        </Container>
                    </Box>
                    <FooterComponent />
                </ThemeProvider>
            </ColorModeContext.Provider>
        </>
    );
}

export default MainPage;
