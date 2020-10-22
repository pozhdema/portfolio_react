import { createStore, combineReducers } from 'redux';
import { applyMiddleware } from 'redux';
import {createBrowserHistory}  from 'history';
import { composeWithDevTools } from 'redux-devtools-extension';
import { i18nextReducer } from 'i18next-redux-languagedetector';

const middleware = [];
const enhancers = [];
const reducers = {
    i18next: i18nextReducer
};

export const history = createBrowserHistory();

export default function configureStore(initialState) {
    const store = createStore(
        combineReducers(reducers),
        initialState,
        composeWithDevTools(
            applyMiddleware(...middleware),
            ...enhancers
        )
    );

    return store;
}