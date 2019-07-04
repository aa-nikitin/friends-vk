import { fetchFriendsSuccess, fetchFriendsFailure } from '../actions';
import { FETCH_FRIENDS_REQUEST } from '../constants';
import { auth, callAPI } from '../api';

const middleware = store => next => action => {
    if (action.type === FETCH_FRIENDS_REQUEST) {
        (async () => {
            try {
                await auth('6488338', 2);
                const friends = await callAPI('friends.get', {
                    fields: 'city',
                    v: '5.100'
                });
                store.dispatch(fetchFriendsSuccess(friends));
            } catch (e) {
                store.dispatch(fetchFriendsFailure(e.message));
            }
        })();
    }
    return next(action);
};
export default middleware;
