// weatherReducer.js
import { FETCH_WEATHER_SUCCESS, FETCH_WEATHER_FAILURE, SET_WEATHER_AVAILABILITY, SET_WEATHER_UNIT, SET_SELECTED_CITY, FETCH_AIR_QUALITY_SUCCESS, FETCH_AIR_QUALITY_FAILURE } from '../actions/weatherActions';

// Initial state
const initialState = {
    weatherData: null,
    error: null,
    isWeatherDataAvailable: false,
    tempUnit: 'celsius',
    selectedCity: null,
    airQualityData: null,
};

// Reducer function
const weatherReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_WEATHER_SUCCESS:
            return {
                ...state,
                weatherData: action.payload,
            };
        case FETCH_WEATHER_FAILURE:
            return {
                ...state,
                error: action.payload,
            };
        case SET_WEATHER_AVAILABILITY:
            return {
                ...state,
                isWeatherDataAvailable: action.payload,
            };
        case SET_WEATHER_UNIT:
            return {
                ...state,
                tempUnit: action.payload,
            };
        case SET_SELECTED_CITY:
            return {
                ...state,
                selectedCity: action.payload,
            };
        case FETCH_AIR_QUALITY_SUCCESS:
            return {
                ...state,
                airQualityData: action.payload,
            };
        case FETCH_AIR_QUALITY_FAILURE:
            return {
                ...state,
                error: action.payload,
            };
        default:
            return state;
    }
};

export default weatherReducer;