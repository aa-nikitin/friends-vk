import {
    FETCH_FRIENDS_REQUEST,
    FETCH_FRIENDS_SUCCESS,
    FETCH_FRIENDS_FAILURE,
    FETCH_CITIES_SUCCESS
} from '../constants';

export const fetchFriendsRequest = () => ({
    type: FETCH_FRIENDS_REQUEST
});

export const fetchFriendsSuccess = value => ({
    type: FETCH_FRIENDS_SUCCESS,
    payload: value
});

export const fetchCitiesSuccess = value => ({
    type: FETCH_CITIES_SUCCESS,
    payload: value
});

export const fetchFriendsFailure = value => ({
    type: FETCH_FRIENDS_FAILURE,
    payload: value
});
