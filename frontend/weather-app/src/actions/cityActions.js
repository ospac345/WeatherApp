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
            dispatch(setCityFailure('Search Error: City not found'));
        } else if (response.status === 401) {
            // Handle 401 (Unauthorized) error
            dispatch(setCityFailure('Search Error: Unauthorized access to the API'));
        } else {
            // Handle other non-200 status codes
            throw new Error(`Search Error: Request failed with status ${response.status}`);
        }
    } catch (error) {
        // Handle network errors or other unexpected errors
        dispatch(setCityFailure('Search Error: Network Error. Failed to fetch city data'));
        // console.error('Error fetching city names:', error);

    }
};

export const setCityCoordErrorMessage = (error) => async (dispatch) => {
    dispatch(setCityFailure('Geolocation Error: ' + error + '. Please search for a city in the search bar'));
};


//The following function is used to set the error message to null when the user clicks on the search bar
export const setErrorToNull = () => async (dispatch) => {
    dispatch(setCityFailure(null));
}



