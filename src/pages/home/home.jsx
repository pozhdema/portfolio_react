import React, {useEffect, useRef, useState} from "react";
import './home.css';
import {withNamespaces} from "react-i18next";
import {toast} from "react-toastify";
import Carousel from "../../components/carousel/carousel";


const Home = React.memo(props => {
    const {t} = props;
    const [slider, setSlider] = useState([]);
    let intervalID = useRef(0);

    useEffect(() => {
        fetch('http://qwe.loc/api')
            .then(response => response.json())
            .then(response => {
                if (response["status"] === "success") {
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