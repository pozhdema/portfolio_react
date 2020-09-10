import React, {useEffect, useState} from "react";
import '../home/home.css';
import {withNamespaces} from "react-i18next";
import './gallery.css'
import FontAwesome from 'react-fontawesome'
import {toast} from "react-toastify";

const GalleryPhoto = React.memo(props => {
    const {t} = props;
    const [images, setImages] = useState([]);
    const [show, setShow] = useState(false);
    const [currentImgIdx, setCurrentImgIdx] = useState(false);
    const [like, setLike] = useState(0);

    useEffect(() => {
        fetch("/photos.json")
            .then(response => response.json())
            .then(data => {
                setImages(data);
            })
    }, []);


    const showModal = (event, images, currentImgIdx) => {
        setShow(true);
        setCurrentImgIdx(currentImgIdx);
    };

    const hideModal = () => {
        setShow(false);
    };

    const Modal = ({handleClose, show, currentImgIdx, images}) => {
        const showHideClassName = show ? "modal display-block" : "modal display-none";
        let currentPhoto = {
            "src": "",
            "id": "",
            "alt": "",
            "caption": "",
            "like": ""
        };

        if (currentImgIdx !== false) {
            currentPhoto = images[currentImgIdx];
        }


        return (
            <div className={showHideClassName} onClick={(event) => {
                if (event.target.classList.contains("modal")) {
                    hideModal()
                }
            }}>
                <button onClick={handleClose} className='modal-btn-close'>
                    <FontAwesome
                        className="fas fa-times"
                        name="close"
                        size="3x"
                        style={{color: '#be94a0'}}
                    />
                </button>
                <button onClick={goToPrevious} className='btn-go-to left'>
                    <FontAwesome
                        className="fas fa-chevron-left"
                        name="chevron-left"
                        size="3x"
                        style={{color: '#be94a0'}}
                    />
                </button>
                <button onClick={gotoNext} className='btn-go-to right'>
                    <FontAwesome
                        className="fas fa-chevron-right"
                        name="chevron-right"
                        size="3x"
                        style={{color: '#be94a0'}}
                    />
                </button>
                <section className='modal-main'>
                    <img
                        id={currentPhoto.id}
                        src={`${currentPhoto.src}`}
                        alt={currentPhoto.alt}
                        className={currentPhoto.width === 200 ? " vertical" : " horizon"}
                        onContextMenu={imgStillRestrict}
                    />
                    <button onClick={liked} className='like'>
                        <FontAwesome
                            className="far fa-heart"
                            name="like"
                            size="2x"
                        />
                        <span className='like-span'>{like}</span>
                    </button>
                    <span>{currentPhoto.caption = t('caption')}</span>
                </section>
            </div>
        );
    };

    const goToPrevious = () => {
        if (currentImgIdx <= 0) {
            setCurrentImgIdx(images.length - 1)
        } else {
            let newIdx = currentImgIdx - 1;
            setCurrentImgIdx(newIdx);
        }
    };

    const gotoNext = () => {
        if (currentImgIdx < images.length - 1) {
            let newIdx = currentImgIdx + 1;
            setCurrentImgIdx(newIdx);
        } else {
            setCurrentImgIdx(0);
        }
    };

    const imgStillRestrict = (event) => {
        event.preventDefault();
        event.stopPropagation();
        toast(t('copyright'), {
            autoClose: 10000,
            closeButton: true,
            type: toast.TYPE.WARNING,
        });
        return false;
    };

    const liked = () => {
        setLike(like+1)
    };

    return (
        <div className='pages'>
            <h1>{t('nav.gallery')}</h1>
            <Modal show={show} handleClose={hideModal} images={images} currentImgIdx={currentImgIdx}/>
            <div className='wrapper-images'>
                {images.map((image, index) => (
                    <div className='img' key={index} onClick={(event) => {
                        showModal(event, images, index)
                    }}>
                        <img
                            id={image.id}
                            src={`${image.src}`}
                            width={image.width}
                            height={image.height}
                            alt={image.alt}
                            onContextMenu={imgStillRestrict}
                        />
                    </div>
                ))}
            </div>
        </div>
    )
});

export default withNamespaces('common')(GalleryPhoto);