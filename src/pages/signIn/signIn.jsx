import React from "react";
import {Field, reduxForm, reset} from "redux-form";
import {withNamespaces} from "react-i18next";
import validate from "../../components/validate/validate";
import {Link} from "react-router-dom";
import './signIn.css'
import {toast} from "react-toastify";

const renderField = ({input, placeholder, type, t, meta: {touched, error}}) => (
    <div className='wrapper-input'>
        <input {...input} placeholder={placeholder} type={type} className='form-input'/>
        {touched && error && <span className='form-span'>{t(error)}</span>}
    </div>
);


const submit = (values, dispatch, props) => {
    fetch('/api/user/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(values)
    })
        .then(response => response.json())
        .then((data) => {
            if (data["status"] === "success") {
                props.history.push('/gallery')
                window.location.reload(false);
            } else {
                toast("Login or password incorrect", {
                    autoClose: 5000,
                    closeButton: true,
                    type: toast.TYPE.ERROR,
                });
            }
        })
        .catch(error => console.error(error));
    dispatch(reset('syncValidation'));
};

const FormSignIn = React.memo(props => {
    const { handleSubmit,submitting, t} = props;
    return (
        <div className='pages sign'>
            <h2>{t('nav.signIn')}</h2>
            <form onSubmit={handleSubmit(submit)} className='form form-sing'>
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
                <div className="admin-btn">
                    <button type="submit" disabled={submitting} className='form-btn'>{t('form.submit')}</button>
                    <Link to="/signUp" className='link-admin'>{t('form.create')}</Link>
                </div>
            </form>
        </div>
    )
});

const SignIn = reduxForm({
    form: 'syncValidation',
    validate,
})(FormSignIn);

export default withNamespaces('common')(SignIn);