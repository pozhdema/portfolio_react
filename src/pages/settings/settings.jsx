import React, {useEffect, useState} from "react";
import '../home/home.css';
import './settings.css'
import {withNamespaces} from "react-i18next";
import Tabs from "../../components/tabs/tabs";
import CategorySettings from "../../components/categorySettings/categorySettings"
import PhotoSettings from "../../components/photoCategory/photoCategory";
import AddCategories from "../../components/addCategory/addCategory";
import AddPhotos from "../../components/addPhoto/addPhoto";
import {toast} from "react-toastify";

const Setting = React.memo(props => {
    const {t} = props;
    const [listCategory, setListCategory] = useState([]);
    const [photo, setPhoto] = useState([]);

    useEffect(() => {
        fetch("/api/categories/fullList")
            .then(response => response.json())
            .then(response => {
                if (response["status"] === "success") {
                    setListCategory(response["data"]);
                } else {
                    toast(response["message"], {
                        autoClose: 5000,
                        closeButton: true,
                        type: toast.TYPE.ERROR,
                    });
                }
            })
    }, []);

    useEffect(() => {
        fetch("/api/photo/list")
            .then(response => response.json())
            .then(response => {
                if (response["status"] === "success") {
                    setPhoto(response["data"]);
                } else {
                    toast(response["message"], {
                        autoClose: 5000,
                        closeButton: true,
                        type: toast.TYPE.ERROR,
                    });
                }
            })
    }, []);

    return (
        <div className='pages'>
            <h2>{t('nav.settings')}</h2>
            <Tabs>
                {t('settings.category')}
                <div className='settings-category'>
                    <AddCategories category={listCategory} setCategory={setListCategory}/>
                    <div className='settings-table'>
                        <CategorySettings category={listCategory} setCategory={setListCategory}/>
                    </div>
                </div>
                {t('settings.gallery')}
                <div className='settings-gallery'>
                    <AddPhotos category={listCategory} photo={photo} setPhoto={setPhoto}/>
                    <div className='settings-table'>
                        <PhotoSettings category={listCategory} photo={photo} setPhoto={setPhoto}/>
                    </div>
                </div>
            </Tabs>
        </div>
    )
});

export default withNamespaces('common')(Setting);