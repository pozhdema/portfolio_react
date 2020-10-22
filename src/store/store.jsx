import { createStore } from "redux";
import rootReducer from "../reducers/reducers";


const localStorageKey1 = "theme";
const persistedTheme1 = localStorage.getItem(localStorageKey1);

let initialState = {
    preferences: persistedTheme1 ? JSON.parse(persistedTheme1) : {},
};

const store = createStore(rootReducer, initialState);

store.subscribe(() => {

        const preferences = store.getState().preferences;
        if (!preferences) return;

    localStorage.setItem(localStorageKey1, JSON.stringify(preferences));
});

export default store;