import { createStore, compose, applyMiddleware } from 'redux';
// import { save } from 'redux-localstorage-simple';
import createSagaMiddleware from 'redux-saga';
import rootReducers from './modules';
// import { middleware } from './modules/friends';
import { sagas } from './modules/friends';

/* eslint-disable no-underscore-dangle */
const composeEnhancers =
    process.env.NODE_ENV !== 'production' &&
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
        : compose;
/* eslint-enable */

const configStore = preloadedState => {
    const sagaMiddleware = createSagaMiddleware();

    const store = createStore(
        rootReducers,
        preloadedState,
        composeEnhancers(applyMiddleware(sagaMiddleware))
    );
    sagaMiddleware.run(sagas);
    return store;
};

const store = configStore({});

export default store;
