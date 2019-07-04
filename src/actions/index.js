import {
    FETCH_FRIENDS_REQUEST,
    FETCH_FRIENDS_SUCCESS,
    FETCH_FRIENDS_FAILURE
} from '../constants';

export const fetchFriendsRequest = value => ({
    type: FETCH_FRIENDS_REQUEST,
    payload: value
});

export const fetchFriendsSuccess = value => ({
    type: FETCH_FRIENDS_SUCCESS,
    payload: value
});

export const fetchFriendsFailure = value => ({
    type: FETCH_FRIENDS_FAILURE,
    payload: value
});
