import React, {useEffect} from "react";
import './nav.css'
import {Link} from 'react-router-dom'
import DarkThemeToggle from "../darkThemeToggle/darkThemeToggle";
import {withNamespaces} from 'react-i18next';
import LanguageSwitcher from "../LanguageSwitcher/LanguageSwitcher";
import {toast} from 'react-toastify';

const Nav = React.memo(props => {
    const {t, lng, roles} = props;

    const refreshPage = () => {
        window.location.reload(false);
    }

    const setCookie = () => {
        let age = '; maxAge=' + 90 * 24 * 3600
        document.cookie = 'lang=' + lng + age + '; path=/'
    };

    const getCookie = (name) => {
        let cookie = {};
        document.cookie.split(';').forEach(function (el) {
            let [k, v] = el.split('=');
            cookie[k.trim()] = v;
        })
        return cookie[name];
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        fetch('http://qwe.loc/api/user/logout')
            .then(response => response.json())
            .then((data) => {
                if (data["status"] === "success") {
                    refreshPage()
                } else {
                    toast("Your don't exit", {
                        autoClose: 5000,
                        closeButton: true,
                        type: toast.TYPE.ERROR,
                    });
                }
            })
            .catch(error => console.error(error));
    };

    useEffect(() => {
        if (getCookie('lang')!==lng) {
            setCookie()
            refreshPage()
        }
    });

    return (
        <nav className='header'>
            <div className='wrapper-nav'>
                <input className="menu-btn" type="checkbox" id="menu-btn"/>
                <label className="menu-icon" htmlFor="menu-btn"><span className="navicon"></span></label>
                <ul className="menu">
                    <Link to='/' className='link'>{t('nav.home')}</Link>
                    <Link to='/gallery' className='link'>{t('nav.gallery')}</Link>
                    <Link to='/contact' className='link'>{t('nav.contact')}</Link>
                    {roles === "admin" || roles === "user" ?
                        <button type='submit' onClick={handleSubmit} className='exit'>{t('exit')}</button>
                        :  <Link to='/signIn' className='link'>{t('nav.signIn')}</Link>}
                    {roles === "admin" ? <Link to='/settings' className='link'>{t('nav.settings')}</Link> : null}
                </ul>
            </div>
            <div className='wrapper-other-nav'>
                <LanguageSwitcher />
                <DarkThemeToggle/>
            </div>
        </nav>


    )
});

export default withNamespaces('common')(Nav);