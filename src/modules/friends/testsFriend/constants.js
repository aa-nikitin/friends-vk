export const INIT_STATE = {
    isLoading: false,
    error: null,
    cities: [],
    friends: []
};

export const friends = [
    {
        id: 3185397,
        first_name: 'Дашенька',
        last_name: 'Иванова',
        city: 'Тула',
        pointCity: [54.193122, 37.617348]
    },
    {
        id: 4758924,
        first_name: 'DELETED',
        last_name: '',
        deactivated: 'deleted',
        online: 0
    },
    {
        id: 5699528,
        first_name: 'Лёня',
        last_name: 'Берлин',
        city: 'Киев',
        pointCity: [50.450441, 30.52355]
    },
    {
        id: 9568602,
        first_name: 'Анна',
        last_name: 'Иванюшина',
        city: 'Тула',
        pointCity: [54.193122, 37.617348]
    }
];

export const cities = [
    {
        id: 146,
        name: 'Тула',
        friends: [
            {
                id: 3185397,
                first_name: 'Дашенька',
                last_name: 'Иванова',
                city: 'Тула',
                pointCity: [54.193122, 37.617348]
            },
            {
                id: 9568602,
                first_name: 'Анна',
                last_name: 'Иванюшина',
                city: 'Тула',
                pointCity: [54.193122, 37.617348]
            }
        ],
        pointCity: [54.193122, 37.617348]
    },
    {
        id: 314,
        name: 'Киев',
        friends: [
            {
                id: 5699528,
                first_name: 'Лёня',
                last_name: 'Берлин',
                city: 'Киев',
                pointCity: [50.450441, 30.52355]
            }
        ],
        pointCity: [50.450441, 30.52355]
    }
];
