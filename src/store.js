import { createStore, compose, applyMiddleware } from 'redux';
// import { save } from 'redux-localstorage-simple';
import rootReducers from './modules';
import { middleware } from './modules/friends';

/* eslint-disable no-underscore-dangle */
const composeEnhancers =
    process.env.NODE_ENV !== 'production' &&
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
        : compose;
/* eslint-enable */

const configStore = preloadedState =>
    createStore(
        rootReducers,
        preloadedState,
        composeEnhancers(applyMiddleware(middleware))
    );

const store = configStore({});

export default store;
