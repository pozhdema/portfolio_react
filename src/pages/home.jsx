import React, {Component} from "react";
import {toast} from "react-toastify";
import logo from '../images/crow-new.png'
import BackgroundSlider from 'react-background-slider'
import '../styles/style.css';

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

        fetch('http://qwe.loc/')
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
            return <p>Loading...</p>;
        }
        if (error) {
            return <p>{error.message}</p>;
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