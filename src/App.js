import React, {Component} from 'react';
import './styles/style.css';
import Nav from './components/nav';
import Gallery from './pages/gallery';
import Contacts from './pages/contacts';
import SignIn from './pages/signIn';
import SignUp from "./pages/signUp";
import Footer from "./components/footer";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import  logo from './images/crow-new.png'
//import image1 from './images/IMG_0624-min.jpg';
import image2 from './images/IMG_2598-compressor.jpg';
import image3 from './images/IMG_0437-compressor.jpg';
import image4 from './images/20190303165950_IMG_2463-compressor.jpg';
import image5 from './images/20180922062108_IMG_1751-compressor.jpg';
import BackgroundSlider from 'react-background-slider'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class App extends Component{

    render() {
        return (
            <Router>
                <div className="App">
                    <Nav/>
                    <Switch>
                        <Route path="/" exact component={Home}/>
                        <Route path="/gallery" component={Gallery}/>
                        <Route path="/contacts" component={Contacts}/>
                        <Route path="/signIn" component={SignIn}/>
                        <Route path="/signUp" component={SignUp}/>
                    </Switch>
                    <ToastContainer />
                    <Footer/>
                </div>
            </Router>
        )
    }
}

const Home = () => (
    <div className="home">
        <BackgroundSlider
            images={[
                '/static/media/IMG_0624-min.f0498765.jpg',
                '/static/media/IMG_2598-compressor.015af6db.jpg',
                '/static/media/IMG_0437-compressor.578fa943.jpg',
                '/static/media/20190303165950_IMG_2463-compressor.f4fb8ea0.jpg',
                '/static/media/20180922062108_IMG_1751-compressor.6e3a542a.jpg']}
            duration={10} transition={2} />
        <img src={logo}/>
    </div>
);

export default App
