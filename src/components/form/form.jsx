import React from "react";
import {Field, reduxForm} from 'redux-form'
import {withNamespaces} from "react-i18next";
import './form.css';
import validate from '../validate/validate'

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
                name='notes'
                className='notes'
                component='textarea'
                placeholder={t('form.message')}
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