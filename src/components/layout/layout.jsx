import React from "react";
import Nav from "../nav/nav";
import Content from "../content/content";
import './layout.css';

const Layout = () => {
    return (
        <div className='layout'>
            <Nav/>
            <Content/>
        </div>
    )
};

export default Layout;