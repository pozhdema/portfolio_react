import { createStore, combineReducers } from 'redux';
import {createBrowserHistory}  from 'history';
import { i18nextReducer } from 'i18next-redux-languagedetector';

const reducers = {
    i18next: i18nextReducer
};

export const history = createBrowserHistory();

export default function configureStore(initialState) {
    const store = createStore(
        combineReducers(reducers),
        initialState
    );

    return store;
}