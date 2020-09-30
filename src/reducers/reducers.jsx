import * as actions from "../actions/actions";
import { combineReducers } from "redux";
import {reducer as formReducer} from 'redux-form'

const preferences = (state = { darkThemeEnabled: false }, action) => {
    switch (action.type) {
        case actions.TOGGLE_DARKTHEME:
            return { ...state, darkThemeEnabled: !state.darkThemeEnabled };
        default:
            return state;
    }
};

const reducers = {
    form:formReducer,
    preferences,
};

export default combineReducers(reducers);