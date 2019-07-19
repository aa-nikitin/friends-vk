import { takeLatest, call, put, fork } from 'redux-saga/effects';
import {
    fetchFriendsSuccess,
    fetchFriendsFailure,
    fetchFriendsCity,
    fetchFriendsRequest
} from './actions';
import { auth, callAPI, geocode } from '../../api';
import { ID_APP } from '../../constants';
const citiesList = [];
const cities = [];

function friendsHandle(friends) {
    const promiseFriends = friends.items.map(item => {
        const {
            id,
            first_name,
            last_name,
            city: { title: city, id: cityId } = {}
        } = item;
        if (city) {
            return geocode(city).then(response => {
                const pointCity = response.split(' ');
                const validItem = {
                    id,
                    first_name,
                    last_name
                };
                if (citiesList.indexOf(city) < 0) {
                    citiesList.push(city);
                    cities.push({
                        id: cityId,
                        name: city,
                        friends: [validItem],
                        pointCity: [+pointCity[1], +pointCity[0]]
                    });
                } else {
                    const checkCity = citiesList.indexOf(city);
                    cities[checkCity].friends.push(validItem);
                }

                return {
                    ...item,
                    pointCity: [+pointCity[1], +pointCity[0]]
                };
            });
        }

        return item;
    });

    return Promise.all(promiseFriends).then(function(results) {
        return results;
    });
}

function* fetchSearch() {
    try {
        yield call(auth, ID_APP, 2);
        const friends = yield call(callAPI, 'friends.get', {
            fields: 'city',
            v: '5.100'
        });
        const promiseFriends = yield call(friendsHandle, friends);

        yield put(fetchFriendsCity(cities));
        yield put(fetchFriendsSuccess(promiseFriends));
    } catch (error) {
        yield put(fetchFriendsFailure(error.message));
    }
}

function* searchRequestWatch() {
    yield takeLatest(fetchFriendsRequest, fetchSearch);
}

export function* sagas() {
    yield fork(searchRequestWatch);
}
