import Modal from "../modal/modal";
import {Field, reduxForm, reset} from "redux-form";
import React, {useState} from "react";
import validate from "../validate/validate";
import {withNamespaces} from "react-i18next";
import useModal from "../useModal/useModal";
import {toast} from "react-toastify";
import './addPhoto.css'
import Select from "react-select";

const AddPhoto = React.memo(props => {
    const {t, handleSubmit, submitting, category} = props;
    const {show, toggle} = useModal();

    const addPhoto = () => {

        // const formData = new FormData();
        // formData.append("file", this.state.file);
        // this.values.value.map(item => {
        //     formData.append('categories[]', item)
        // });
        // formData.append("title_ua", this.state.title_ua);
        // formData.append("title_en", this.state.title_en);
        // formData.append("description_ua", this.state.description_ua);
        // formData.append("description_en", this.state.description_en);
        //
        // fetch("http://qwe.loc/api/photo/add", {
        //     method: "post",
        //     body: formData
        // })
        //     .then(response => response.json())
        //     .then((data) => {
        //         if (data["status"] === "success") {
        //             toast("Photo and category added", {
        //                 autoClose: 5000,
        //                 closeButton: true,
        //                 type: toast.TYPE.SUCCESS,
        //             });
        //             this.values = [];
        //             this.props.addCard(data["data"]);
        //             this.setState({
        //                 title_ua: "",
        //                 title_en: "",
        //                 description_ua: "",
        //                 description_en: ""
        //             });
        //             this.onClose()
        //         } else {
        //             toast(data["message"], {
        //                 autoClose: 5000,
        //                 closeButton: true,
        //                 type: toast.TYPE.ERROR,
        //             });
        //         }
        //     })
        //     .catch(error => console.error(error));
        // dispatch(reset('syncValidation'));
        toggle();
    };

    const renderField = ({input, type, placeholder, id}) => (
        <div className='wrapper-input'>
            <input {...input} placeholder={placeholder} id={id} type={type} className='form-input category-input'/>
        </div>
    );

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
                    <Field
                        name='picture'
                        type='file'
                        component={renderField}
                        id='download-photo'
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
                        defaultValue="Category"
                        isMulti
                        options={options}
                        className="basic-multi-select select-photo-settings"
                        classNamePrefix="select"
                    />
                    <div>
                        <button type="submit" disabled={submitting} className='btn-category'>{t('form.submit')}</button>
                    </div>
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