import { API_KEY } from './constants';
const VK = window.VK;
export const auth = (appId, perms) => {
    return new Promise((resolve, reject) => {
        VK.init({
            apiId: appId
        });

        VK.Auth.login(response => {
            if (response.session) {
                resolve(response);
            } else {
                reject(new Error('Не удалось авторизоваться'));
            }
        }, perms);
    });
};

export const callAPI = (method, params) => {
    return new Promise((resolve, reject) => {
        VK.api(method, params, function(data) {
            if (data.error) {
                reject(data.error);
            } else {
                resolve(data.response);
            }
        });
    });
};

export const geocode = city =>
    fetch(
        `https://geocode-maps.yandex.ru/1.x/?format=json&apikey=${API_KEY}&geocode=${city}&lang=en-US`,
        {
            method: 'GET',
            mode: 'cors'
        }
    )
        .then(response => {
            return response.json();
        })
        .then(response => {
            return response.response.GeoObjectCollection.featureMember[0]
                .GeoObject.Point.pos;
        });
