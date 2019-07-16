import { handleActions } from 'redux-actions';
import { combineReducers } from 'redux';
import {
    fetchFriendsRequest,
    fetchFriendsSuccess,
    fetchFriendsFailure,
    fetchFriendsCity
} from './actions';

const isLoading = handleActions(
    {
        [fetchFriendsRequest]: () => true,
        [fetchFriendsSuccess]: () => false,
        [fetchFriendsFailure]: () => false,
        [fetchFriendsCity]: () => false
    },
    false
);

const error = handleActions(
    {
        [fetchFriendsRequest]: () => null,
        [fetchFriendsFailure]: (_state, action) => action.payload
    },
    null
);

const cities = handleActions(
    {
        [fetchFriendsRequest]: () => [],
        [fetchFriendsCity]: (_state, action) => action.payload
    },
    []
);

const friends = handleActions(
    {
        [fetchFriendsRequest]: () => [],
        [fetchFriendsSuccess]: (_state, action) => action.payload
    },
    []
);

export default combineReducers({
    isLoading,
    error,
    cities,
    friends
});
