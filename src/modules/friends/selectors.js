import { createSelector } from 'reselect';

export const getCities = state => state.friends.cities;
export const getIsLoading = state => state.friends.isLoading;
export const getError = state => state.friends.error;
export const getFriends = createSelector(
    state => state.friends.friends,
    friends => {
        // console.log(friends);
        return friends.map(
            ({
                id,
                first_name,
                last_name,
                city: { title } = {},
                pointCity
            }) => ({
                id,
                first_name,
                last_name,
                city: title,
                pointCity
            })
        );
    }
);
