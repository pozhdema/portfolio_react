import React, {useEffect, useState, useCallback, useRef} from "react";
import '../home/home.css';
import {withNamespaces} from "react-i18next";
import './gallery.css'
import FontAwesome from 'react-fontawesome'
import {toast} from "react-toastify";
import Filter from "../../components/filter/filter";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from 'react-loader-spinner';

const GalleryPhoto = React.memo(props => {
    const {t} = props;
    const [images, setImages] = useState([]);
    const [categories, setCategories] = useState([])
    const [show, setShow] = useState(false);
    const [currentImgIdx, setCurrentImgIdx] = useState(false);
    const [like, setLike] = useState(0);
    const [clicked, setClicked] = useState("0");
    const [element, setElement] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        fetch('/api/categories/list')
            .then(response => response.json())
            .then(response => {
                if (response["status"] === "success") {
                    setIsLoading(false);
                    setCategories(response["data"]);
                } else {
                    toast(response["message"], {
                        autoClose: 5000,
                        closeButton: true,
                        type: toast.TYPE.ERROR,
                    });
                }
            })
    }, [])

    const onFilterChange = (id) => {
        fetch(`/api/photo/photo?category=${id}`)
            .then(response => response.json())
            .then(response => {
                if (response["status"] === "success") {
                    setIsLoading(false);
                    setCurrentImgIdx(false);
                    setImages(response["data"]);
                    setClicked(id);
                }
            })
    };

    const liked = (event) => {
        fetch('/api/photo/setLike', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({id: event.target.dataset.id})
        })
            .then(response => response.json())
            .then((data) => {
                if (data["status"] === "success") {
                    setIsLoading(false);
                    toast("Liked", {
                        autoClose: 5000,
                        closeButton: true,
                        type: toast.TYPE.SUCCESS,
                    });
                    setLike(parseInt(like + 1));
                } else {
                    toast(data["message"], {
                        autoClose: 5000,
                        closeButton: true,
                        type: toast.TYPE.ERROR,
                    });
                }
            })
            .catch(error => console.error(error));
    }

    const showModal = (event, images, currentImgIdx) => {
        setShow(true);
        setCurrentImgIdx(currentImgIdx);
        setLike(images[currentImgIdx]["like"]);
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
                    {currentPhoto.src!==''?<img
                        id={currentPhoto["id"]}
                        src={currentPhoto["path"] + currentPhoto["full"] + currentPhoto["name"]}
                        alt={currentPhoto["title_en"]}
                        className={currentPhoto["vertical"] === '1' ? " vertical" : " horizon"}
                        onContextMenu={imgStillRestrict}
                    />: null}
                    <div className='modal-info'>
                        <span>{t(currentPhoto["title"])}</span>
                        <button onClick={liked} className='like'>
                            <FontAwesome
                                className="far fa-heart"
                                name="like"
                                size="lg"
                                data-id={currentPhoto.id}
                            />
                            <span data-id={currentPhoto.id} className='like-span'>{like}</span>
                        </button>
                    </div>
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

    const page = useRef(0);
    const prevY = useRef(0);
    const observer = useRef(
        new IntersectionObserver(
            entries => {
                const firstEntry = entries[0];
                const y = firstEntry.boundingClientRect.y;

                if (prevY.current > y) {
                    loadMore();
                }

                prevY.current = y;
            },
            {threshold: 0.5}
        )
    );

    const fetchData = useCallback(async (offset) => {
        let response = await fetch(`/api/photo/photo?&offset=${offset}&limit=15`)
            .then(response => response.json())
        return response
    }, []);

    const handleInitial = useCallback(
        async (page) => {
            const newImages = await fetchData(page);
            const {status, data} = newImages;
            if (status === 'success') setImages(images => [...images, ...data]);
        },
        [fetchData]
    );

    const loadMore = () => {
        page.current = page.current + 15;
        handleInitial(page.current);
    };

    useEffect(() => {
        handleInitial(page.current);
    }, [handleInitial]);

    useEffect(() => {
        const currentElement = element;
        const currentObserver = observer.current;

        if (currentElement) {
            currentObserver.observe(currentElement);
        }

        return () => {
            if (currentElement) {
                currentObserver.unobserve(currentElement);
            }
        };
    }, [element]);

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
            <h2>{t('nav.gallery')}</h2>
            <Modal show={show} handleClose={hideModal} images={images} currentImgIdx={currentImgIdx}/>
            <Filter
                categories={categories}
                onFilterChange={onFilterChange}
                clicked={clicked}
            />
            <div className='wrapper-images'>
                {images && (images.map((image, index) => (
                    <div className='img' key={index} onClick={(event) => {
                        showModal(event, images, index)
                    }}>
                        <img
                            width={image["vertical"] === '0' ? 320 : 160}
                            height='240'
                            src={image["path"] + image["min"] + image["name"]}
                            id={image["id"]}
                            alt={image["title_en"]}
                            onContextMenu={imgStillRestrict}
                        />
                    </div>
                )))}
                <div ref={setElement} className="buttonContainer">
                    <button className="buttonStyle"></button>
                </div>
            </div>
        </div>
    )
});

export default withNamespaces('common')(GalleryPhoto);