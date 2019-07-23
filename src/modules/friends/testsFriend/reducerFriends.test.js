import friendsReducer from '../reducer';
import {
    fetchFriendsRequest,
    fetchFriendsSuccess,
    fetchFriendsFailure,
    fetchFriendsCity
} from '../actions';

import { INIT_STATE, friends } from './constants.js';

describe('reducers friends test', () => {
    it('test initial state', () => {
        const state0 = friendsReducer(undefined, {});
        expect(state0).toEqual(INIT_STATE);
    });
    it('test action fetchFriendsRequest', () => {
        const state0 = friendsReducer(INIT_STATE, fetchFriendsRequest());
        const stateResult = { ...INIT_STATE, isLoading: true };

        expect(state0).toEqual(stateResult);
    });
    it('test action fetchFriendsSuccess', () => {
        const state0 = friendsReducer(INIT_STATE, fetchFriendsSuccess(friends));
        const stateResult = {
            ...INIT_STATE,
            friends: friends,
            isLoading: false
        };

        expect(state0).toEqual(stateResult);
    });
    it('test action fetchFriendsCity', () => {
        const state0 = friendsReducer(INIT_STATE, fetchFriendsCity(friends));
        const stateResult = {
            ...INIT_STATE,
            cities: friends,
            isLoading: false
        };

        expect(state0).toEqual(stateResult);
    });
    it('test action fetchFriendsFailure', () => {
        const message = 'error';
        const state0 = friendsReducer(INIT_STATE, fetchFriendsFailure(message));
        const stateResult = {
            ...INIT_STATE,
            error: message,
            isLoading: false
        };

        expect(state0).toEqual(stateResult);
    });
});
