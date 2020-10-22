import React from "react";
import {Field, reduxForm, reset} from "redux-form";
import {withNamespaces} from "react-i18next";
import validate from "../../components/validate/validate";
import {Link} from "react-router-dom";
import {toast} from "react-toastify";
import '../signIn/signIn.css'

const renderField = ({input, placeholder, type, t, meta: {touched, error}}) => (
    <div className='wrapper-input'>
        <input {...input} placeholder={placeholder} type={type} className='form-input'/>
        {touched && error && <span className='form-span'>{t(error)}</span>}
    </div>
);

const submit = (values, dispatch, props) => {
    console.log(values)
    fetch('http://qwe.loc/api/user/create', {
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

const FormSignUp = React.memo(props => {
    const {handleSubmit, submitting, t} = props;
    return (
        <div className='pages'>
            <h2>{t('nav.signUp')}</h2>
            <form onSubmit={handleSubmit(submit)} className='form signUp'>
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
                <Field
                    name='confirmPassword'
                    type='password'
                    component={renderField}
                    placeholder={t('form.confirmPassword')}
                    t={t}
                />
                <div className="admin-btn">
                    <button type="submit" disabled={submitting} className='form-btn'>{t('form.submit')}</button>
                    <Link to="/signIn" className='link-admin'>{t('form.member')}</Link>
                </div>
            </form>
        </div>
    )
});

const SignUp = reduxForm({
    form: 'syncValidation',
    validate,
})(FormSignUp);

export default withNamespaces('common')(SignUp);