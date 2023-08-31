import axios from 'axios';
import { localhostURL } from '../constants/constants';

// Action types
export const FETCH_WEATHER_SUCCESS = 'FETCH_WEATHER_SUCCESS';
export const FETCH_WEATHER_FAILURE = 'FETCH_WEATHER_FAILURE';
export const SET_WEATHER_AVAILABILITY = 'SET_WEATHER_AVAILABILITY';
export const SET_WEATHER_UNIT = 'SET_WEATHER_UNIT';
export const SET_SELECTED_CITY = 'SET_SELECTED_CITY';

// Action creators
export const fetchWeatherSuccess = (weatherData) => ({
    type: FETCH_WEATHER_SUCCESS,
    payload: weatherData,
});

export const fetchWeatherFailure = (error) => ({
    type: FETCH_WEATHER_FAILURE,
    payload: error,
});

export const setWeatherAvailability = (isAvailable) => ({
    type: SET_WEATHER_AVAILABILITY,
    payload: isAvailable,
});

export const setWeatherUnit = (tempUnit) => ({
    type: SET_WEATHER_UNIT,
    payload: tempUnit,
});

export const setSelectedCity = (city) => ({
    type: SET_SELECTED_CITY,
    payload: city,
});

// Thunk function

export const changeTempUnit = (tempUnit) => async (dispatch) => {
    dispatch(setWeatherUnit(tempUnit));
};

export const setSelectedCityData = (city) => async (dispatch) => {
    dispatch(setSelectedCity(city));
    console.log('selected city from weather actions', city);
};


export const fetchWeatherData = (lat, lng, tempUnit) => async (dispatch) => {
    try {
        const response = await axios.post(localhostURL + '/api/weather', {
            lat: lat,
            lng: lng,
            tempUnit: tempUnit
        });
        if (response.status === 200) {
            const weatherData = response.data;
            if (weatherData) {
                dispatch(fetchWeatherSuccess(response.data));
                dispatch(setWeatherAvailability(true));
            } else {
                dispatch(fetchWeatherSuccess([]));
            }
        } else {
            throw new Error('Request failed');
        }
    } catch (error) {
        console.error('Error fetching city names:', error);
        dispatch(fetchWeatherSuccess([]));
        dispatch(fetchWeatherFailure(error.message));
    }
};



