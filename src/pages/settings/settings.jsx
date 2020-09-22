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

    useEffect(() => {
        fetch("http://qwe.loc/api/categories/fullList")
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

    return (
        <div className='pages'>
            <h1>{t('nav.settings')}</h1>
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
                    <AddPhotos category={listCategory}/>
                    <div className='settings-table'>
                        <PhotoSettings category={listCategory}/>
                    </div>
                </div>
            </Tabs>
        </div>
    )
});

export default withNamespaces('common')(Setting);