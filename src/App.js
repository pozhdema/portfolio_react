import React from 'react';
import './style.css';
import Nav from './components/nav';
import Gallery from './pages/gallery';
import Contacts from './pages/contacts';
import Admin from './pages/admin';
import Footer from "./components/footer";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import  logo from './images/crow-new.png'
import image1 from './images/IMG_0624-min.jpg';
import image2 from './images/IMG_2598-compressor.jpg';
import image3 from './images/IMG_0437-compressor.jpg';
import image4 from './images/20190303165950_IMG_2463-compressor.jpg';
import image5 from './images/20180922062108_IMG_1751-compressor.jpg';
import BackgroundSlider from 'react-background-slider'

function App() {
    return (
        <Router>
            <div className="App">
                <Nav/>
                <Switch>
                    <Route path="/" exact component={Home}/>
                    <Route path="/gallery" component={Gallery}/>
                    <Route path="/contacts" component={Contacts}/>
                    <Route path="/admin" component={Admin}/>
                </Switch>
                <Footer/>
            </div>
        </Router>
    )
}

const Home = () => (
    <div className="home">
        <BackgroundSlider
            images={[image1, image2, image3, image4, image5]}
            duration={10} transition={2} />
        <img src={logo}/>
    </div>
);

export default App
