// cityActions.js
import axios from 'axios';
import { localhostURL } from '../constants/constants';

// Action types
export const SET_CITY_DATA = 'SET_CITY_DATA';
export const SET_CTY_FAILURE = 'SET_CTY_FAILURE';

// Action creators
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
    try {
        const response = await axios.post(localhostURL + '/api', {
            value: keyword,
        });

        if (response.status === 200) {
            const data = response.data;
            if (data) {
                dispatch(setCityData(response.data.geonames));
            } else {
                dispatch(setCityData([]));
            }
        } else {
            throw new Error('Request failed');
        }
    } catch (error) {
        console.error('Error fetching city names:', error);
        dispatch(setCityData([]));
        dispatch(setCityFailure(error.message));
    }
};


