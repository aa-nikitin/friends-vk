import {
    fetchFriendsSuccess,
    fetchFriendsFailure,
    fetchFriendsCity,
    fetchFriendsRequest
} from './actions';
import { auth, callAPI, geocode } from '../../api';

const idApp = '7052362';

const middleware = store => next => action => {
    if (action.type === fetchFriendsRequest.toString()) {
        (async () => {
            try {
                await auth(idApp, 2);
                const friends = await callAPI('friends.get', {
                    fields: 'city',
                    v: '5.100'
                });
                const citiesList = [];
                const cities = [];
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
                store.dispatch(fetchFriendsCity(cities));
                Promise.all(promiseFriends).then(function(results) {
                    store.dispatch(fetchFriendsSuccess(results));
                });
            } catch (e) {
                store.dispatch(fetchFriendsFailure(e.message));
            }
        })();
    }
    return next(action);
};
export { middleware };
