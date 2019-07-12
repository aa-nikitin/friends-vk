import { createSelector } from 'reselect';

export const getSeriesImages = createSelector(
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
            }) => {
                const aaa = {
                    id,
                    first_name,
                    last_name,
                    city: title,
                    pointCity
                };
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
