import axios from 'axios';

// Action types
export const FETCH_WEATHER_SUCCESS = 'FETCH_WEATHER_SUCCESS';
export const FETCH_WEATHER_FAILURE = 'FETCH_WEATHER_FAILURE';
export const SET_WEATHER_AVAILABILITY = 'SET_WEATHER_AVAILABILITY';
export const SET_WEATHER_UNIT = 'SET_WEATHER_UNIT';
export const SET_SELECTED_CITY = 'SET_SELECTED_CITY';
export const FETCH_AIR_QUALITY_SUCCESS = 'FETCH_AIR_QUALITY_SUCCESS';
export const FETCH_AIR_QUALITY_FAILURE = 'FETCH_AIR_QUALITY_FAILURE';

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

export const fetchAirQualitySuccess = (airQualityData) => ({
    type: FETCH_AIR_QUALITY_SUCCESS,
    payload: airQualityData,
});

export const fetchAirQualityFailure = (error) => ({
    type: FETCH_AIR_QUALITY_FAILURE,
    payload: error,
});

// Thunk function

export const changeTempUnit = (tempUnit) => async (dispatch) => {
    dispatch(setWeatherUnit(tempUnit));
};

export const setSelectedCityData = (city) => async (dispatch) => {
    // Dispatch the action to set the selected city
    dispatch(setSelectedCity(city));

    // Get the current list of cities from local storage
    let selectedCities = JSON.parse(localStorage.getItem('selectedCities')) || [];

    // Check if the city is already in the list
    const isDuplicate = selectedCities.some(selectedCity => selectedCity.name === city.name);

    if (!isDuplicate) {
        // Add the new city to the list
        selectedCities = [city, ...selectedCities.slice(0, 4)];

        // Save the updated list back to local storage
        localStorage.setItem('selectedCities', JSON.stringify(selectedCities));
    }
};




export const fetchWeatherData = (lat, lng, tempUnit) => async (dispatch) => {
    try {
        const response = await axios.post('/api/weather', {
            lat: lat,
            lng: lng,
            tempUnit: tempUnit,
        });

        if (response.status === 200) {
            const weatherData = response.data;
            dispatch(fetchWeatherSuccess(weatherData)); // Dispatch success action
            dispatch(setWeatherAvailability(true));
        } else {
            throw new Error('Request failed');
        }
    } catch (error) {
        console.error('Error fetching weather data:', error);

        if (error.response && error.response.data && error.response.data.reason) {
            const reason = error.response.data.reason;
            dispatch(fetchWeatherFailure(`Reason: ${reason}`)); // Dispatch failure action with reason
        } else {
            dispatch(fetchWeatherFailure('An error occurred while fetching weather data.')); // Dispatch generic failure action
        }
        dispatch(setWeatherAvailability(false));
    }
};

export const fetchAirQualityData = (lat, lng) => async (dispatch) => {
    try {
        const response = await axios.post('/api/airquality', {
            lat: lat,
            lng: lng,
        });

        if (response.status === 200) {
            const airQualityData = response.data;
            dispatch(fetchAirQualitySuccess(airQualityData)); // Dispatch success action
        } else {
            throw new Error('Request failed');
        }
    } catch (error) {
        console.error('Error fetching air quality data:', error);

        if (error.response && error.response.data && error.response.data.reason) {
            const reason = error.response.data.reason;
            dispatch(fetchAirQualityFailure(`Reason: ${reason}`)); // Dispatch failure action with reason
        } else {
            dispatch(fetchAirQualityFailure('An error occurred while fetching air quality data.')); // Dispatch generic failure action
        }
    }
}





