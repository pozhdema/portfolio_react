import React from "react";
import Nav from "../nav/nav";
import Content from "../content/content";
import './layout.css';
import Footer from "../footer/footer";

const Layout = () => {
    return (
        <div className='layout'>
            <Nav/>
            <Content/>
            <Footer/>
        </div>
    )
};

export default Layout;