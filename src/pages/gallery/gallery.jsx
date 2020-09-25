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
        fetch("http://qwe.loc/api/photo/photo")
            .then(response => response.json())
            .then(response => {
                if ( response["status"] === "success") {
                    setImages(response["data"]);
                } else {
                    toast( response["message"], {
                        autoClose: 5000,
                        closeButton: true,
                        type: toast.TYPE.ERROR,
                    });
                }
            })
    }, []);

    const liked = (event) => {
        console.log(event.target.dataset.id)
        fetch('http://qwe.loc/api/photo/setLike', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({id : event.target.dataset.id})
        })
            .then(response => response.json())
            .then((data) => {
                if (data["status"] === "success") {
                    toast("Liked", {
                        autoClose: 5000,
                        closeButton: true,
                        type: toast.TYPE.SUCCESS,
                    });
                    setLike(parseInt(like+1))
                } else {
                    toast(data["message"], {
                        autoClose: 5000,
                        closeButton: true,
                        type: toast.TYPE.ERROR,
                    });
                }
            })
            .catch(error => console.error(error));
        console.log(like)
    }

    const showModal = (event, images, currentImgIdx) => {
        setShow(true);
        setCurrentImgIdx(currentImgIdx);
        setLike(images[currentImgIdx]["like"])
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
            "title": "",
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
                        style={{color: '#baae97'}}
                    />
                </button>
                <button onClick={goToPrevious} className='btn-go-to left'>
                    <FontAwesome
                        className="fas fa-chevron-left"
                        name="chevron-left"
                        size="3x"
                        style={{color: '#baae97'}}
                    />
                </button>
                <button onClick={gotoNext} className='btn-go-to right'>
                    <FontAwesome
                        className="fas fa-chevron-right"
                        name="chevron-right"
                        size="3x"
                        style={{color: '#baae97'}}
                    />
                </button>
                <section className='modal-main'>
                    <img
                        id={currentPhoto["id"]}
                        src={currentPhoto["path"] + currentPhoto["full"] + currentPhoto["name"]}
                        alt={currentPhoto["title_en"]}
                        className={currentPhoto["vertical"] === '1' ? " vertical" : " horizon"}
                        onContextMenu={imgStillRestrict}
                    />
                    <button  onClick={liked} className='like'>
                        <FontAwesome
                            className="far fa-heart"
                            name="like"
                            size="2x"
                            data-id={currentPhoto.id}
                        />
                        <span data-id={currentPhoto.id} className='like-span'>{like}</span>
                    </button>
                    <span>{t(currentPhoto["title"])}</span>
                </section>
            </div>
        );
    };

    const goToPrevious = () => {
        if (currentImgIdx <= 0) {
            setCurrentImgIdx(images.length - 1)
            setLike(images[images.length - 1]["like"])
        } else {
            let newIdx = currentImgIdx - 1;
            setCurrentImgIdx(newIdx);
            setLike(images[newIdx]["like"])
        }
    };

    const gotoNext = () => {
        if (currentImgIdx < images.length - 1) {
            let newIdx = currentImgIdx + 1;
            setCurrentImgIdx(newIdx);
            setLike(images[newIdx]["like"])
        } else {
            setCurrentImgIdx(0);
            setLike(images[0]["like"])
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
                            id={image["id"]}
                            src={image["path"] + image["min"] + image["name"]}
                            alt={image["title_en"]}
                            onContextMenu={imgStillRestrict}
                        />
                    </div>
                ))}
            </div>
        </div>
    )
});

export default withNamespaces('common')(GalleryPhoto);