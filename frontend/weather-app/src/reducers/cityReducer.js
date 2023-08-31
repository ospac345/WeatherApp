// cityReducer.js
import { SET_CITY_DATA, SET_CTY_FAILURE } from '../actions/cityActions'; // Import the action type constant

const initialState = {
    cityData: [],
    error: null,
};

const cityReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_CITY_DATA: // Use the imported action type constant
            return {
                ...state,
                cityData: action.payload,
            };
        case SET_CTY_FAILURE: // Use the imported action type constant
            return {
                ...state,
                error: action.payload,
            };
        default:
            return state;
    }
};

export default cityReducer;