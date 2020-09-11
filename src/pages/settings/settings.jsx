import React, {useEffect, useState} from "react";
import '../home/home.css';
import './settings.css'
import {withNamespaces} from "react-i18next";
import Tabs from "../../components/tabs/tabs";
import {toast} from "react-toastify";

const Settings = React.memo(props => {
    const {t} = props;
    const [listCategory, setListCategory] = useState([])

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
                Category
                <div className='settings-category'>
                    <button className='settings-btn'>{t("settings.addCategory")}</button>
                    <table className='category-table'>
                        <thead>
                            <tr>
                                <td className='table-header'> Title_UK</td>
                                <td className='table-header'> Title_EN</td>
                                <td className='table-header'> {t("settings.edit")}</td>
                                <td className='table-header'> {t("settings.delete")}</td>
                            </tr>
                        </thead>
                        <tbody>
                        {listCategory.map((list, index) => (
                            <tr  key={index}>
                                <td>{list["title_ua"]}</td>
                                <td>{list["title_en"]}</td>
                                <td><button className='btn-edit'>{t("settings.edit")}</button></td>
                                <td><button className='btn-edit'>{t("settings.delete")}</button></td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
                Gallery
                <div className='settings-gallery'>
                    2
                </div>
            </Tabs>
        </div>
    )
});

export default withNamespaces('common')(Settings);