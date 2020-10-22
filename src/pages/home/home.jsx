import React, {useEffect, useRef, useState} from "react";
import './home.css';
import {withNamespaces} from "react-i18next";
import {toast} from "react-toastify";
import Carousel from "../../components/carousel/carousel";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from 'react-loader-spinner';

const Home = React.memo(props => {
    const {t} = props;
    const [isLoading, setIsLoading] = useState(false);
    const [slider, setSlider] = useState([]);
    let intervalID = useRef(0);

    useEffect(() => {
        setIsLoading(true);
        fetch('/api')
            .then(response => response.json())
            .then(response => {
                if (response["status"] === "success") {
                    setIsLoading(false)
                    setSlider(response["data"]);
                    let visibleImage = 0;
                    const sliderElements = document.getElementsByClassName('item-slider');
                    sliderElements[0].style.opacity = 1;
                    intervalID.current = setInterval(() => {
                        if (visibleImage >= sliderElements.length - 1) {
                            sliderElements[visibleImage].style.opacity = 0;
                            visibleImage = 0;
                            sliderElements[visibleImage].style.opacity = 1;
                        } else {
                            sliderElements[visibleImage].style.opacity = 0;
                            visibleImage++;
                            sliderElements[visibleImage].style.opacity = 1;
                        }
                    }, 10000);
                } else {
                    toast(response["message"], {
                        autoClose: 5000,
                        closeButton: true,
                        type: toast.TYPE.ERROR,
                    });
                }
            })
            .catch(error => error => console.error(error));
        return () => {
            clearInterval(intervalID.current);
        }
    }, [])

    if (isLoading) {
        return <Loader
            type="Puff"
            color="#c6baba"
            height={80}
            width={80}
            className="loader"
        />;
    }

    return (
        <div className='pages'>
            <h1>{t('nameSite')}</h1>
            <span className='name-site'>{t('photographer')}</span>
            <img src='crow-new.png' alt='icon' className='crow'/>
            <Carousel slider={slider}/>
        </div>
    )
});

export default withNamespaces('common')(Home);