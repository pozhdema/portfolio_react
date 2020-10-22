import React, { useState} from "react";
import {withNamespaces} from "react-i18next";
import {toast} from "react-toastify";
import useModal from "../useModal/useModal";
import Modal from "../modal/modal";
import './photoCategory.css';
import Select from 'react-select';


const PhotoSettings = React.memo(props => {
    const {t, category, photo, setPhoto} = props;
    const [visible, setVisible] = useState(false);
    const [slider, setSlider] = useState(false);
    const [titleUa, setTitleUa] = useState('');
    const [titleEn, setTitleEn] = useState('');
    const [descriptionUa, setDescriptionUa] = useState('');
    const [descriptionEn, setDescriptionEn] = useState('');
    const [values, setValues] = useState(['33']);
    const [photoId, setPhotoId] = useState(0);
    const {show, toggle} = useModal();



    const deletePhoto = (val) => {
        let id = val.target.dataset.id;
        fetch('/api/photo/delete', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({id: id})
        })
            .then(response => response.json())
            .then((data) => {
                if (data["status"] === "success") {
                    toast("Photo successful deleted", {
                        autoClose: 5000,
                        closeButton: true,
                        type: toast.TYPE.SUCCESS,
                    });
                    setPhoto(photo.filter(item => item.id !== id));
                } else {
                    toast(data["message"], {
                        autoClose: 5000,
                        closeButton: true,
                        type: toast.TYPE.ERROR,
                    });
                }
            })
            .catch(error => console.error(error));
    };

    const showEditPhotoModal = (id) => {
        fetch("/api/photo/getPhoto", {
            method: "post",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({id: id})
        })
            .then(response => response.json())
            .then((data) => {
                if (data["status"] === "success") {
                    setValues(data.data.categories);
                    setVisible(data.data.visible === '1');
                    setSlider(data.data.slider === '1');
                    setTitleUa(data.data.title_ua);
                    setTitleEn(data.data.title_en);
                    setDescriptionUa(data.data.description_ua);
                    setDescriptionEn(data.data.description_en);
                } else {
                    toast(data["message"], {
                        autoClose: 5000,
                        closeButton: true,
                        type: toast.TYPE.ERROR,
                    });
                }
            })
            .catch(error => console.error(error));

        const item = photo.filter(item => item.id === id);
        setTitleUa(item[0]["title_ua"]);
        setTitleEn(item[0]["title_en"]);
        setDescriptionUa(item[0]["description_ua"]);
        setDescriptionEn(item[0]["description_en"]);
        setSlider(item[0]["slider"]);
        setVisible(item[0]["visible"]);
        setPhotoId(item[0]["id"])
        toggle();
    }

    const updatePhoto = () => {
        fetch('/api/photo/update', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                visible: visible === true ? 1 : 0,
                slider: slider === true ? 1 : 0,
                categories: values,
                id: photoId,
                title_ua: titleUa,
                title_en: titleEn,
                description_ua: descriptionUa,
                description_en: descriptionEn
            })
        })
            .then(response => response.json())
            .then((data) => {
                if (data["status"] === "success") {
                    toast("Photo successful edit", {
                        autoClose: 5000,
                        closeButton: true,
                        type: toast.TYPE.SUCCESS,
                    });
                } else {
                    toast(data["message"], {
                        autoClose: 5000,
                        closeButton: true,
                        type: toast.TYPE.ERROR,
                    });
                }
            })
            .catch(error => console.error(error));
        toggle()
    };

    const handleVisible = () => {
        setVisible(!visible)
    };

    const handleVSlider = () => {
        setSlider(!slider)
    };

    const handleSelect = (options) => {
        let selectedValues = [];
        options.forEach((option)=>{
            selectedValues.push(option.value)
        })
        setValues(selectedValues)
    };

    let options = [];
    for (let i in category) {
        options.push({key: category[i].id, label: category[i].title_en, value: category[i].id})
    }

    return (
        <table className='category-table'>
            <thead>
            <tr>
                <th className='table-header photo'> Photo</th>
                <th className='table-header photo-edit'> {t("settings.edit")}</th>
                <th className='table-header photo-edit'> {t("settings.delete")}</th>
            </tr>
            </thead>
            <tbody>
            {photo.map((card, index) => (
                <tr key={index}>
                    <td>
                        <img
                            src={card.path}
                            id={card.id}
                            className="card-photo"
                            alt='gallery'
                        />
                    </td>
                    <td>
                        <button className='btn-edit' data-id={card.id} onClick={() => showEditPhotoModal(card.id)}>
                            {t("settings.edit")}
                        </button>
                    </td>
                    <td>
                        <button data-id={card.id} className='btn-edit' onClick={deletePhoto}>
                            {t("settings.delete")}
                        </button>
                    </td>
                </tr>
            ))}
            <Modal
                show={show}
                hide={toggle}
            >
                <form className='category-form photo-form' onSubmit={updatePhoto}>
                    <div className='wrapper-photo'>
                        <label><input type="checkbox" value="visible" onChange={handleVisible} checked={visible}/> Visible</label>
                    </div>
                    <div className='wrapper-photo'>
                        <label><input type="checkbox" value="slider" onChange={handleVSlider} checked={slider}/> Slider</label>
                    </div>
                    <div className='wrapper-input'>
                        <input className='form-input category-input' placeholder='Title-ua' name='title_ua' onChange={e => setTitleUa(e.target.value)} value={titleUa}/>
                    </div>
                    <div className='wrapper-input'>
                        <input className='form-input category-input' name='title_en' placeholder='Title-en' onChange={e => setTitleEn(e.target.value)} value={titleEn}/>
                    </div>
                    <div className='wrapper-input'>
                        <input className='form-input category-input' placeholder='Description-ua' name='description_ua' onChange={e => setDescriptionUa(e.target.value)} value={descriptionUa}/>
                    </div>
                    <div className='wrapper-input'>
                        <input className='form-input category-input' name='description_en' placeholder='Description-ua' onChange={e => setDescriptionEn(e.target.value)} value={descriptionEn}/>
                    </div>
                    <Select
                        value={options.filter(item => values.includes(item.value))}
                        isMulti
                        options={options}
                        className="basic-multi-select select-photo-settings"
                        classNamePrefix="select"
                        onChange={handleSelect}
                    />
                    <button className='btn-category' type='submit'>{t('form.submit')}</button>
                </form>
            </Modal>
            </tbody>
        </table>
    )
})


export default withNamespaces('common')(PhotoSettings);