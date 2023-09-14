// cityReducer.js
import { SET_CITY_DATA, SET_CTY_FAILURE, FETCH_CITY_DATA_REQUEST } from '../actions/cityActions'; // Import the action type constant

const initialState = {
    cityData: [],
    error: null,
    isLoading: false,
};

const cityReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_CITY_DATA:
            return {
                ...state,
                cityData: action.payload,
                isLoading: false,
            };
        case SET_CTY_FAILURE:
            return {
                ...state,
                error: action.payload,
                isLoading: false,
            };
        case FETCH_CITY_DATA_REQUEST:
            return {
                ...state,
                isLoading: true,
            };
        default:
            return state;
    }
};

export default cityReducer;