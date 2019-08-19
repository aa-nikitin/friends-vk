import {
    fetchFriendsRequest,
    fetchFriendsSuccess,
    fetchFriendsFailure,
    fetchFriendsCity
} from '../actions';
import { auth, callAPI } from '../../../api';
import { ID_APP } from '../../../constants';
import { fetchSearch, searchRequestWatch, friendsHandle } from '../sagas';
import { call, put, takeLatest } from 'redux-saga/effects';

const cities = [];

describe('testing of sags', () => {
    it('fetchsearch test for fetchFriendsRequest action', () => {
        const iterator = searchRequestWatch();
        expect(iterator.next().value).toEqual(
            takeLatest(fetchFriendsRequest, fetchSearch)
        );
    });
    const iterator = fetchSearch();
    it('authorization testing', () => {
        expect(iterator.next().value).toEqual(call(auth, ID_APP, 2));
    });
    const friends = call(callAPI, 'friends.get', {
        fields: 'city',
        v: '5.100'
    });
    it('testing a query for getting friends in the VK', () => {
        expect(iterator.next().value).toEqual(friends);
    });
    const promiseFriends = call(friendsHandle, friends);
    it('data processing to obtain the coordinates of the cities', () => {
        expect(iterator.next(friends).value).toEqual(promiseFriends);
    });
    it('sending an array of cities to state', () => {
        expect(iterator.next(promiseFriends).value).toEqual(
            put(fetchFriendsCity(cities))
        );
    });
    it('sending an array of friends to state', () => {
        expect(iterator.next().value).toEqual(
            put(fetchFriendsSuccess(promiseFriends))
        );
    });
    it('error handling', () => {
        expect(iterator.throw({ message: 'failure' }).value).toEqual(
            put(fetchFriendsFailure('failure'))
        );
    });
});
