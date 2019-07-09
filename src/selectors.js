import { createSelector } from 'reselect';

import { geocode } from './api';

export const getSeriesImages = createSelector(
    state => state.friends.friends,
    friends => {
        // console.log(friends);
        return friends.map(
            ({ id, first_name, last_name, city: { title } = {} }) => {
                const aaa = {
                    id,
                    first_name,
                    last_name,
                    city: title
                };
                // console.log(aaa);
                return aaa;
            }
        );
    }
    // elements.map(({ id, image: { original }, name }) => ({
    //     id,
    //     image: original,
    //     name
    // }))
);
