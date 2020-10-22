import {Field, reduxForm, reset} from "redux-form";
import React, {useState} from "react";
import Modal from "../modal/modal";
import validate from "../validate/validate";
import {withNamespaces} from "react-i18next";
import useModal from "../useModal/useModal";
import {toast} from "react-toastify";
import './addPhoto.css'
import Select from "react-select";
import FontAwesome from "react-fontawesome";

const AddPhoto = React.memo(props => {
    const {t, handleSubmit, submitting, category, photo, setPhoto} = props;
    const {show, toggle} = useModal();
    const [categories, setCategories] = useState([]);
    const [file, setFile] = useState(null);

    const addPhoto = (photoItem, dispatch) => {
        const formData = new FormData();
        categories.forEach(item => {
            formData.append('categories[]', item)
        });
        formData.append("file", file);
        formData.append("title_ua", photoItem.title_ua);
        formData.append("title_en", photoItem.title_en);
        formData.append("description_ua", photoItem.description_ua);
        formData.append("description_en", photoItem.description_en);

        fetch("/api/photo/add", {
            method: "post",
            body: formData
        })
            .then(response => response.json())
            .then((data) => {
                if (data["status"] === "success") {
                    toast("Photo and category added", {
                        autoClose: 5000,
                        closeButton: true,
                        type: toast.TYPE.SUCCESS,
                    });
                    photoItem(data["data"]);
                    setPhoto([...photo, photoItem])
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

    const renderField = ({input, type, placeholder, t, meta: { touched, error }}) => (
        <div className='wrapper-input'>
            <input {...input} placeholder={placeholder} type={type} className='form-input category-input'/>
            {touched && error && <span className='form-span'>{t(error)}</span>}
        </div>
    );

    const handleSelect = (options) => {
        let listCategories = [];
        options.forEach((option)=>{
            listCategories.push(option.value)
        })
        setCategories(listCategories)
    };

    let options = [];
    for (let i in category) {
        options.push({key: category[i].id + "_opt", label: category[i].title_en, value: category[i].id})
    }

    return (
        <>
            <button className='settings-btn' onClick={toggle}>
                {t("settings.addPhoto")}
            </button>
            <Modal
                show={show}
                hide={toggle}
            >
                <form onSubmit={handleSubmit(addPhoto)} className='category-form photo-form'>
                    <label htmlFor="file-upload" className="custom-file-upload">
                        <FontAwesome name="upload" className="fa-upload"/> {t("upload")}
                    </label>
                    <input
                        id="file-upload"
                        name='file'
                        type='file'
                        onChange={(event)=>{
                            setFile(event.target.files[0])
                        }}
                    />
                    <Field
                        name='title_ua'
                        type='text'
                        component={renderField}
                        placeholder="title_ua"
                        t={t}
                    />
                    <Field
                        name='title_en'
                        type='text'
                        component={renderField}
                        placeholder="title_en"
                        t={t}
                    />
                    <Field
                        name='description_ua'
                        type='text'
                        component={renderField}
                        placeholder="description_ua"
                        t={t}
                    />
                    <Field
                        name='description_en'
                        type='text'
                        component={renderField}
                        placeholder="description_en"
                        t={t}
                    />
                    <Select
                        isMulti
                        options={options}
                        className="basic-multi-select select-photo-settings"
                        classNamePrefix="select"
                        onChange={handleSelect}
                    />
                    <button type="submit" disabled={submitting} className='btn-category'>{t('form.submit')}</button>
                </form>
            </Modal>
        </>
    )
})

const AddPhotos = reduxForm({
    form: 'syncValidation',
    validate,
})(AddPhoto);

export default withNamespaces('common')(AddPhotos);