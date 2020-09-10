import React from "react";
import './home.css';
import {withNamespaces} from "react-i18next";

const Home = React.memo(props => {
    const { t } = props;
    return (
        <div className='pages'>
            <h1>{t('nav.home')}</h1>
        </div>
    )
});

export default withNamespaces('common')(Home);