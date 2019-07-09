import { fetchFriendsSuccess, fetchFriendsFailure } from '../actions';
import { FETCH_FRIENDS_REQUEST } from '../constants';
import { auth, callAPI, geocode } from '../api';

const middleware = store => next => action => {
    if (action.type === FETCH_FRIENDS_REQUEST) {
        (async () => {
            try {
                await auth('6488338', 2);
                const friends = await callAPI('friends.get', {
                    fields: 'city',
                    v: '5.100'
                });
                // console.log(friends);
                const ccc = friends.items.map(item => {
                    const { city: { title: city } = {} } = item;
                    if (city) {
                        return geocode(city).then(response => {
                            const pointCity = response.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos.split(
                                ' '
                            );
                            return { ...item, pointCity };
                        });

                        // console.log(aaa);
                        // return { ...item, city };
                    }
                    // console.log(item);
                    return item;
                });
                Promise.all(ccc).then(function(results) {
                    store.dispatch(fetchFriendsSuccess(results));
                    // return results;
                });
            } catch (e) {
                store.dispatch(fetchFriendsFailure(e.message));
            }
        })();
    }
    return next(action);
};
export default middleware;
