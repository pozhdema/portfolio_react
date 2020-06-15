import React, {Component} from "react";
import {toast} from "react-toastify";
import logo from '../images/crow-new.png'
import BackgroundSlider from 'react-background-slider'
import '../styles/style.css';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import Loader from 'react-loader-spinner'

class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            imagesName: [],
            isLoading: false,
            error: null,
        };
    }

    componentDidMount() {
        this.setState({isLoading: true});

        fetch('https://api.pozhdema.in.ua/')
            .then(response => response.json())
            .then(response => {
                console.log(response);
                if (response["status"] === "success") {
                    this.setState({imagesName: response["data"], isLoading: false});
                } else {
                    toast(response["message"], {
                        autoClose: 5000,
                        closeButton: true,
                        type: toast.TYPE.ERROR,
                    });
                }
            })
            .catch(error => this.setState({error, isLoading: false}));
    }

    render() {
        const {imagesName, isLoading, error} = this.state;
        if (isLoading) {
            return <Loader
                type="Puff"
                color="#c6baba"
                height={80}
                width={80}
                className="loader"
            />;
        }
        if (error) {
            return <p className="error-message">{error.message}</p>;
        }

        return (
            <div className="home">
                <BackgroundSlider
                    images={imagesName}
                    duration={10} transition={2}/>
                <img src={logo}/>
            </div>
        )
    }
}

export default Home;