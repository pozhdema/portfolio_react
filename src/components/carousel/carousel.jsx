import React from "react";
import './carousel.css'


const Carousel = (props) => {
    const {slider} = props;

    return (
        <div className='slider-home'>
            {slider.map((image, index) => (
                <img
                    key={index}
                    style={
                        {
                            display: 'block',
                            opacity: 0,
                            transition: 'opacity 2s linear',
                            backgroundImage: 'url(' + image + ')'
                        }
                    }
                    className='item-slider'
                />
            ))}
        </div>
    )
}

export default Carousel;