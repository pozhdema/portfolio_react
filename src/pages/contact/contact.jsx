import React from "react";
import '../home/home.css';
import './contact.css';
import {withNamespaces} from "react-i18next";
import OrderForm from '../../components/form/form';
import {reset} from 'redux-form';
import {toast} from "react-toastify";

const Contact = React.memo(props => {
    const { t } = props;
    const submit = (values, dispatch) => {
        fetch('/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(values)
        })
            .then(response => response.json())
            .then((data) => {
                if (data["status"] === "success") {
                    toast("Your message submit", {
                        autoClose: 5000,
                        closeButton: true,
                        type: toast.TYPE.SUCCESS,
                    });
                } else {
                    toast("Your message don't submit", {
                        autoClose: 5000,
                        closeButton: true,
                        type: toast.TYPE.ERROR,
                    });
                }
            })
            .catch(error => console.error(error));
        dispatch(reset('syncValidation'));
    };

    return (
        <div className='pages'>
            <h2>{t('nav.contact')}</h2>
            <div className='contact'>
                <div className="contact-social">
                    <div className="wrapper-social">
                        <span>{t('phone')}</span>
                        <span><a href="tel: +380-73-046-94-75">+380-73-046-94-75</a></span>
                    </div>
                    <div className="wrapper-social">
                        <span>{t('email')}</span>
                        <span><a href="mailto: pozhdema107@gmail.com">pozhdema107@gmail.com</a></span>
                    </div>
                </div>
                <OrderForm onSubmit={submit}/>
            </div>
        </div>
    )
});

export default withNamespaces('common')(Contact);