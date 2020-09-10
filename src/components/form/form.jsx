import React from "react";
import {Field, reduxForm} from 'redux-form'
import {withNamespaces} from "react-i18next";
import './form.css';

const validate = values => {
    const errors ={};

    if (!values.username) {
        errors.username ='form.error.required'
    }else if (values.username.length > 15){
        errors.username = 'form.error.username'
    }
    if (!values.email) {
        errors.email = 'form.error.required'
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'form.error.email'
    }
    if (!values.password) {
        errors.password = 'form.error.required'
    } else if (!/^(?=.*[a-z])(?=.*[A-Z])((?=.*[0-9])|(?=.*[!@#$%\^&\*]))(?=.{8,20})/i.test(values.password)) {
        errors.password = 'form.error.password'
    }
    return errors
};

const renderField = ({input, placeholder, type, t, meta: { touched, error }}) => (
    <div className='wrapper-input'>
        <input {...input} placeholder={placeholder} type={type} className='form-input'/>
        {touched && error && <span className='form-span'>{t(error)}</span>}
    </div>
);

const Form = React.memo(props => {
    const {  handleSubmit, submitting, t} = props;
    return (
        <form onSubmit={handleSubmit} className='form'>
            <Field
                name='username'
                type='text'
                component={renderField}
                placeholder={t('form.username')}
                t={t}
            />
            <Field
                name='email'
                type='email'
                component={renderField}
                placeholder={t('form.email')}
                t={t}
            />
            <Field
                name='password'
                type='password'
                component={renderField}
                placeholder={t('form.password')}
                t={t}
            />
            <button type="submit" disabled={submitting} className='form-btn'>{t('form.submit')}</button>
        </form>
    )
});

const OrderForm = reduxForm({
    form: 'syncValidation',
    validate,
})(Form);

export default withNamespaces('common')(OrderForm);