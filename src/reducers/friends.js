import {
    FETCH_FRIENDS_REQUEST,
    FETCH_FRIENDS_SUCCESS,
    FETCH_FRIENDS_FAILURE,
    FETCH_CITIES_SUCCESS
} from '../constants';

const initialState = { friends: [], cities: [], isLoading: false, error: null };

const friendsList = (state = initialState, { type, payload = {} }) => {
    switch (type) {
        case FETCH_FRIENDS_REQUEST:
            return { ...state, friends: [], isLoading: true };
        case FETCH_FRIENDS_SUCCESS:
            return { ...state, friends: payload, isLoading: false };
        case FETCH_CITIES_SUCCESS:
            return { ...state, cities: payload, isLoading: false };
        case FETCH_FRIENDS_FAILURE:
            return { ...state, error: payload, isLoading: false };
        default:
            return state;
    }
};

export default friendsList;
