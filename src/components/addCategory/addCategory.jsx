import Modal from "../modal/modal";
import {Field, reduxForm, reset} from "redux-form";
import React from "react";
import validate from "../validate/validate";
import {withNamespaces} from "react-i18next";
import useModal from "../useModal/useModal";
import {toast} from "react-toastify";

const AddCategory = React.memo(props => {
    const {t, handleSubmit, submitting, category, setCategory} = props;
    const {show, toggle} = useModal();

    const addCategory = (categoryItem, dispatch )=> {
        fetch('/api/categories/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(categoryItem)
        })
            .then(response => response.json())
            .then((data) => {
                if (data["status"] === "success") {
                    toast("Category successful added", {
                        autoClose: 5000,
                        closeButton: true,
                        type: toast.TYPE.SUCCESS,
                    });
                    categoryItem["id"] = data.data.id;
                    setCategory([...category, categoryItem])
                } else {
                    toast(data["message"], {
                        autoClose: 5000,
                        closeButton: true,
                        type: toast.TYPE.ERROR,
                    });
                }
            })
            .catch(error => console.error(error));
        dispatch(reset('syncValidation'));
        toggle();
    };

    const renderField = ({input, placeholder, type, t, meta: { touched, error }}) => (
        <div className='wrapper-input'>
            <input {...input} placeholder={placeholder} type={type} className='form-input category-input'/>
            {touched && error && <span className='form-span'>{t(error)}</span>}
        </div>
    );

    return (
        <>
            <button className='settings-btn' onClick={toggle}>
                {t("settings.addCategory")}
            </button>
            <Modal
                show={show}
                hide={toggle}
            >
                <form onSubmit={handleSubmit(addCategory)} className='category-form'>
                    <Field
                        name='title_ua'
                        type='text'
                        component={renderField}
                        placeholder="title_uk"
                        t={t}
                    />
                    <Field
                        name='title_en'
                        type='text'
                        component={renderField}
                        placeholder="title_en"
                        t={t}
                    />
                    <button type="submit" disabled={submitting} className='btn-category'>{t('form.submit')}</button>
                </form>
            </Modal>
        </>
    )
})

const AddCategories = reduxForm({
    form: 'syncValidation',
    validate,
})(AddCategory);

export default withNamespaces('common')(AddCategories);
