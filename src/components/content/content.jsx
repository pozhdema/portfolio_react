import React from "react";
import {Route, Switch} from "react-router-dom";
import Home from "../../pages/home/home";
import GalleryPhoto from "../../pages/gallery/gallery";
import Contact from "../../pages/contact/contact";
import SignIn from "../../pages/signIn/signIn";
import SignUp from "../../pages/signUp/signUp";
import Settings from "../../pages/settings/settings";

const Content = () => {
    return(
        <Switch>
            <Route path="/" exact component={Home}/>
            <Route path="/gallery" component={GalleryPhoto}/>
            <Route path="/contact" component={Contact}/>
            <Route path="/signIn" component={SignIn}/>
            <Route path="/signUp" component={SignUp}/>
            <Route path="/settings" component={Settings}/>
        </Switch>
    )
};

export default Content;