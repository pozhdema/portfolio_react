import React, {useEffect, useState} from "react";
import {withNamespaces} from "react-i18next";
import './modalCookie.css'


const ModalCookie = React.memo(props => {
    const [banner, setBanner] = useState(false);
    const {t} = props;

    const setCookieModal = () => {
        let age = '; maxAge=' + 90 * 24 * 3600
        document.cookie = 'banner' + '=' + banner + age + '; path=/'
    }
    const bannerHideClassName = !banner ? "cookie display-none" : "cookie display-block";

    const handleBanner = () => {
        setBanner(false)
        setCookieModal()
    }

    const getCookieModal = () => {
        let cookie = {};
        document.cookie.split(';').forEach(function (el) {
            let [k, v] = el.split('=');
            cookie[k.trim()] = v;
        })
        return cookie['banner'];
    }
    useEffect(()=>{
        if (typeof getCookieModal() ==='undefined'){
            setBanner(true)
        } else {
            setBanner(false)
        }
    })

    return (
        <div className={bannerHideClassName}>
            <div className='cookie-content'></div>
            <div className='cookie-modal'>
                <p className='cookie-text'>{t('cookie')}</p>
                <button type="submit" onClick={handleBanner} className='cookie-btn'>{t('understand')}</button>
            </div>
        </div>
    )
});

export default withNamespaces('common')(ModalCookie);