// cityActions.js
import axios from 'axios';

// Action types
export const FETCH_CITY_DATA_REQUEST = 'FETCH_CITY_DATA_REQUEST';
export const SET_CITY_DATA = 'SET_CITY_DATA';
export const SET_CTY_FAILURE = 'SET_CTY_FAILURE';

// Action creators

export const fetchCityDataRequest = () => ({
    type: FETCH_CITY_DATA_REQUEST,
});

export const setCityData = (cityData) => ({
    type: SET_CITY_DATA,
    payload: cityData,
});

export const setCityFailure = (error) => ({
    type: SET_CTY_FAILURE,
    payload: error,
});

// Thunk actions
export const fetchCityData = (keyword) => async (dispatch) => {
    dispatch(fetchCityDataRequest()); // Dispatch loading request
    try {
        const response = await axios.post('/api', {
            value: keyword,
        });

        if (response.status === 200) {
            const data = response.data;
            if (data) {
                dispatch(setCityData(response.data.geonames));
            } else {
                dispatch(setCityData([]));
            }
        } else if (response.status === 404) {
            // Handle 404 (Not Found) error
            dispatch(setCityFailure('City not found'));
        } else if (response.status === 401) {
            // Handle 401 (Unauthorized) error
            dispatch(setCityFailure('Unauthorized access to the API'));
        } else {
            // Handle other non-200 status codes
            throw new Error(`Request failed with status ${response.status}`);
        }
    } catch (error) {
        // Handle network errors or other unexpected errors
        console.error('Error fetching city names:', error);
        dispatch(setCityFailure('Failed to fetch city data'));
    }
};

export const setCityCoordErrorMessage = (error) => async (dispatch) => {
    dispatch(setCityFailure(error));
};


