import React, {useState} from "react";
import {withNamespaces} from "react-i18next";
import useModal from "../useModal/useModal";
import {toast} from "react-toastify";
import './categorySettings.css'
import Modal from "../modal/modal";

const CategorySettings = React.memo(props => {
    const {t, category, setCategory} = props;
    const {show, toggle} = useModal();
    const [titleUa, setTitleUa] = useState("");
    const [titleEn, setTitleEn] = useState("");
    const [categoryId, setCategoryId] = useState( 0);

    const deleteCategory = (val) => {
        let id = val.target.dataset.id;
        fetch('/api/categories/delete', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({id: id})
        })
            .then(response => response.json())
            .then((data) => {
                if (data["status"] === "success") {
                    toast("Category successful deleted", {
                        autoClose: 5000,
                        closeButton: true,
                        type: toast.TYPE.SUCCESS,
                    });
                    setCategory(category.filter(item => item.id !== id));
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

    const showEditModal = (id) => {
        const item = category.filter(item => item.id === id);
        setTitleUa(item[0]["title_ua"]);
        setTitleEn(item[0]["title_en"]);
        setCategoryId(item[0]["id"])
        toggle();
    }

    const updateCategory = () => {
        const listCategoryUpdate = {
            "title_ua": titleUa,
            "title_en": titleEn,
            "id": categoryId
        }
        fetch('/api/categories/update', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(listCategoryUpdate)
        })
            .then(response => response.json())
            .then((data) => {
                if (data["status"] === "success") {
                    toast("Category successful edit", {
                        autoClose: 5000,
                        closeButton: true,
                        type: toast.TYPE.SUCCESS,
                    });
                    setCategory(category.map(item=> (item.id === categoryId ? listCategoryUpdate :item)))
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

    return (
        <table className='category-table'>
            <thead>
            <tr>
                <th className='table-header'> Title_UK</th>
                <th className='table-header'> Title_EN</th>
                <th className='table-header'> {t("settings.edit")}</th>
                <th className='table-header'> {t("settings.delete")}</th>
            </tr>
            </thead>
            <tbody>
            {category.map((list, index) => (
                <tr key={index}>
                    <td>{list["title_ua"]}</td>
                    <td>{list["title_en"]}</td>
                    <td>
                        <button className='btn-edit' data-id={list.id} onClick={()=>showEditModal(list.id)}>{t("settings.edit")}</button>
                    </td>
                    <td>
                        <button data-id={list.id} className='btn-edit' onClick={deleteCategory}>{t("settings.delete")}</button>
                    </td>
                </tr>
            ))}
            <Modal
                show={show}
                hide={toggle}
            >
                <form className='category-form' onSubmit={updateCategory}>
                    <div className='wrapper-input'>
                        <input className='form-input category-input' name='title_ua' onChange={e => setTitleUa(e.target.value)} value={titleUa} />
                    </div>
                    <div className='wrapper-input'>
                        <input className='form-input category-input' name='title_en' onChange={e => setTitleEn(e.target.value)} value={titleEn}/>
                    </div>
                    <button className='btn-category' type='submit'>{t('form.submit')}</button>
                </form>
            </Modal>
            </tbody>
        </table>
    )
})

export default withNamespaces('common')(CategorySettings);
