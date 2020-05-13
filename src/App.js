import React, {Component} from 'react';
import './styles/style.css';
import Nav from './components/nav';
import Gallery from './pages/gallery';
import Contacts from './pages/contacts';
import SignIn from './pages/signIn';
import SignUp from "./pages/signUp";
import Footer from "./components/footer";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from "./pages/home";
import Settings from "./settings";

class App extends Component{

    render() {
        return (
            <Router>
                <div className="App">
                    <Nav/>
                    <Switch>
                        <Route path="/" exact component={HomeLoad}/>
                        <Route path="/gallery" component={Gallery}/>
                        <Route path="/contacts" component={Contacts}/>
                        <Route path="/signIn" component={SignIn}/>
                        <Route path="/signUp" component={SignUp}/>
                        <Route path="/signUp" component={Settings}/>
                    </Switch>
                    <ToastContainer />
                    <Footer/>
                </div>
            </Router>
        )
    }
}

const HomeLoad = () => (
    <Home/>
);

export default App
