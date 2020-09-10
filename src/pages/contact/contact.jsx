import React from "react";
import '../home/home.css';
import './contact.css';
import {withNamespaces} from "react-i18next";
import OrderForm from '../../components/form/form';
import {reset} from 'redux-form';

const Contact = React.memo(props => {
    const { t } = props;
    const submit = (values, dispatch) => {
        dispatch(reset('syncValidation'));
    };

    return (
        <div className='pages'>
            <h1>{t('nav.contact')}</h1>
            <OrderForm onSubmit={submit}/>
        </div>
    )
});

export default withNamespaces('common')(Contact);