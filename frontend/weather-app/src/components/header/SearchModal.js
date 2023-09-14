import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';
import CitySearch from '../CitySearch';
import { Grid } from '@mui/material';
import { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { fetchWeatherData, setSelectedCityData } from '../../actions/weatherActions';
import Button from '@mui/material/Button';
import HistoryIcon from '@mui/icons-material/History';
import { useTheme } from '@mui/material/styles';
import ClearIcon from '@mui/icons-material/Clear';

export default function SearchModal() {
    const [open, setOpen] = useState(false);
    const tempUnit = useSelector((state) => state.weather.tempUnit);
    const dispatch = useDispatch();
    const theme = useTheme();


    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div>
            <IconButton onClick={handleOpen}>
                <SearchIcon />
            </IconButton>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '75%',
                        height: '75%',
                        bgcolor: theme.palette.background.default,
                        boxShadow: 24,
                        p: 4,
                        '@media (max-width: 600px)': {
                            width: '100%', // Full width on small screens
                            height: '100%' // Full height on small screens
                        }
                    }}
                >
                    <Grid container >
                        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'end' }}>
                            <IconButton onClick={handleClose}>
                                <ClearIcon />
                            </IconButton>
                        </Grid>
                        <Grid item xs={12}>
                            <CitySearch closeSearchModal={handleClose} />
                        </Grid>

                        {localStorage.getItem('selectedCities') && JSON.parse(localStorage.getItem('selectedCities')).length > 0 &&

                            <Grid item xs={12}>
                                <Typography sx={{ margin: '5px' }}>
                                    Recent
                                </Typography>
                                {
                                    JSON.parse(localStorage.getItem('selectedCities')).map((city, index) => {
                                        return (
                                            <Button
                                                key={index}
                                                size="small"
                                                variant="outlined"
                                                onClick={() => {
                                                    dispatch(setSelectedCityData(city));
                                                    dispatch(fetchWeatherData(city.lat, city.lng, tempUnit));
                                                    handleClose();
                                                }}
                                                sx={{ p: 1, display: 'flex', marginBottom: '5px', width: '100%', flexGrow: 1, justifyContent: 'space-between' }}>
                                                <Typography key={'cityName-' + index} id="modal-modal-description" sx={{ textTransform: 'none', fontSize: '15px', color: theme.palette.text.primary }}>
                                                    <HistoryIcon sx={{ marginRight: '10px' }} />
                                                    {city.name}
                                                </Typography>
                                                <Typography key={'countryName-' + index} id="modal-modal-description" sx={{ textTransform: 'none', fontSize: '15px', color: theme.palette.text.primary, opacity: '0.5' }}>
                                                    {city.countryName}
                                                </Typography>
                                            </Button>
                                        )
                                    }
                                    )}
                            </Grid>
                        }
                    </Grid>
                </Box>
            </Modal>
        </div >
    );
}
