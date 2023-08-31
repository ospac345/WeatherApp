import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import ThermostatIcon from '@mui/icons-material/Thermostat';
import { useTheme } from '@mui/material/styles';
import { ColorModeContext } from '../MainPage';
import { useDispatch, useSelector } from "react-redux";
import { changeTempUnit, fetchWeatherData } from "../../actions/weatherActions";



const StyledMenu = styled((props) => (
    <Menu
        elevation={0}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}
        {...props}
    />
))(({ theme }) => ({
    '& .MuiPaper-root': {
        borderRadius: 6,
        marginTop: theme.spacing(1),
        minWidth: 180,
        color:
            theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
        boxShadow:
            'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
        '& .MuiMenu-list': {
            padding: '4px 0',
        },
        '& .MuiMenuItem-root': {
            '& .MuiSvgIcon-root': {
                fontSize: 18,
                color: theme.palette.text.secondary,
                marginRight: theme.spacing(1.5),
            },
            '&:active': {
                backgroundColor: alpha(
                    theme.palette.primary.main,
                    theme.palette.action.selectedOpacity,
                ),
            },
        },
    },
}));

export default function CustomizedMenus() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const theme1 = useTheme();
    const colorMode = React.useContext(ColorModeContext);
    const dispatch = useDispatch();
    const { tempUnit, selectedCity } = useSelector((state) => state.weather);


    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const capitalize = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }


    // Rename the local function
    const handleTempUnitChange = () => {
        if (tempUnit === 'celsius') {
            dispatch(changeTempUnit('fahrenheit'));
            if (selectedCity !== null) {
                dispatch(fetchWeatherData(selectedCity.lat, selectedCity.lng, 'fahrenheit'));
            }
        } else {
            dispatch(changeTempUnit('celsius'));
            if (selectedCity !== null) {
                dispatch(fetchWeatherData(selectedCity.lat, selectedCity.lng, 'celsius'));
            }
        }
    }


    <MenuItem onClick={handleTempUnitChange} disableRipple>
        <ThermostatIcon />
        {tempUnit === 'celsius' ? 'Fahrenheit' : 'Celsius'}
    </MenuItem>


    return (
        <div>
            <Button
                id="demo-customized-button"
                aria-controls={open ? 'demo-customized-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                variant="contained"
                disableElevation
                onClick={handleClick}
                endIcon={<KeyboardArrowDownIcon />}
            >
                Options
            </Button>
            <StyledMenu
                id="demo-customized-menu"
                MenuListProps={{
                    'aria-labelledby': 'demo-customized-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
            >

                <MenuItem onClick={colorMode.toggleColorMode} color="inherit">
                    {theme1.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
                    {capitalize(theme1.palette.mode)} mode
                </MenuItem>
                <Divider sx={{ my: 0.5 }} />
                <MenuItem onClick={handleTempUnitChange} disableRipple>
                    <ThermostatIcon />
                    {tempUnit === 'celsius' ? 'Fahrenheit' : 'Celsius'}
                </MenuItem>
            </StyledMenu>
        </div>
    );
}
