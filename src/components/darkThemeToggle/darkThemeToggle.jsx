import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { TOGGLE_DARKTHEME } from "../../actions/actions";
import './darkThemeToggle.css'
import {withNamespaces} from "react-i18next";

const DarkThemeToggle = React.memo(props => {
    const darkThemeEnabled = useSelector((state) => state.preferences.darkThemeEnabled);
    const dispatch = useDispatch();
    const { t } = props;
    return (
        <p className='change-theme'>
            <input
                type="checkbox"
                checked={darkThemeEnabled}
                onChange={() => dispatch({ type: TOGGLE_DARKTHEME })}
                id='check'
            ></input>
            <label htmlFor='check'>{t('theme')}</label>
        </p>
    );
});

export default withNamespaces('common')(DarkThemeToggle);