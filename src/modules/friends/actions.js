import { createActions } from 'redux-actions';

const {
    friends: {
        request: fetchFriendsRequest,
        success: fetchFriendsSuccess,
        failure: fetchFriendsFailure,
        city: fetchFriendsCity
    }
} = createActions(
    {
        FRIENDS: {
            REQUEST: null,
            SUCCESS: null,
            FAILURE: null,
            CITY: null
        }
    },
    { namespace: '_' }
);

export {
    fetchFriendsRequest,
    fetchFriendsSuccess,
    fetchFriendsFailure,
    fetchFriendsCity
};
