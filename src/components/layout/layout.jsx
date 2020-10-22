import React, {useEffect, useState} from "react";
import Nav from "../nav/nav";
import Content from "../content/content";
import './layout.css';
import Footer from "../footer/footer";
import {toast} from "react-toastify";

const Layout = () => {
    const [roles, setRoles] = useState('');

    useEffect(()=>{
        fetch('http://qwe.loc/api/user/get')
            .then(response => response.json())
            .then(response => {
                if (response["status"] === "success") {
                    setRoles(response["data"]["role"]);
                } else {
                    toast(response["message"], {
                        autoClose: 5000,
                        closeButton: true,
                        type: toast.TYPE.ERROR,
                    });
                }
            })
            .catch(error => console.error(error));
    }, []);

    return (
        <div className='layout'>
            <Nav  roles={roles}/>
            <Content  roles={roles}/>
            <Footer/>
        </div>
    )
};

export default Layout;