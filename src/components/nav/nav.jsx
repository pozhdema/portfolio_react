import React from "react";
import './nav.css'
import {Link} from 'react-router-dom'
import DarkThemeToggle from "../darkThemeToggle/darkThemeToggle";
import { withNamespaces } from 'react-i18next';
import LanguageSwitcher from "../LanguageSwitcher/LanguageSwitcher";

const Nav = React.memo(props => {
    const { t } = props;

    return (
            <nav className='header'>
                <ul className="nav">
                    <Link to='/' className='link'>{t('nav.home')}</Link>
                    <Link to='/gallery' className='link'>{t('nav.gallery')}</Link>
                    <Link to='/contact' className='link'>{t('nav.contact')}</Link>
                    <Link to="/signIn" className="link">{t('nav.signIn')}</Link>
                    <Link to="/settings" className="link">{t('nav.settings')}</Link>
                </ul>
                <LanguageSwitcher />
                <DarkThemeToggle/>
            </nav>


    )
});

export default withNamespaces('common')(Nav);