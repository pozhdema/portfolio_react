import React, {Component} from 'react'
import Filter from "../components/filter";
import '../styles/pages/gallery.css'
import {toast} from "react-toastify";
import Lightbox from 'react-lightbox-component';
import 'react-lightbox-component/build/css/index.css'
import Loader from "react-loader-spinner";

class Gallery extends Component {
    constructor(props) {
        super(props);

        this.state = {
            categories: [],
            isLoading: false,
            error: null,
            clicked: 0,
            images: []
        };
    }

    onFilterChange = (id) => {
        let url = new URL('https:api.pozhdema.in.ua/photo/photo')
        url.search = new URLSearchParams({
            category: id
        })
        fetch(url)
            .then(response => response.json())
            .then(response => {
                if (response["status"] === "success") {
                    this.setState({images: response["data"], isLoading: false, clicked: id})
                }
            })
    };

    async componentDidMount() {
        this.setState({isLoading: true});
        try {
            let result = await Promise.all([
                fetch('https:api.pozhdema.in.ua/categories/list')
                    .then(response => response.json()),
                fetch('https:api.pozhdema.in.ua/photo/photo')
                    .then(response => response.json())

            ]);

            let category = result[0];
            let photo = result[1];

            if (category["status"] === "success" && photo["status"] === "success") {
                category["data"].push({
                    id: 0,
                    title_en: "All",
                    title_ua: "Всі",
                });

                this.setState({
                    categories: category["data"],
                    isLoading: false,
                    images: photo["data"]
                });

            } else {
                toast(category["status"] === "error" ? category["message"] : photo["message"], {
                    autoClose: 5000,
                    closeButton: true,
                    type: toast.TYPE.ERROR,
                });
            }
        } catch (error) {
            toast(error, {
                autoClose: 5000,
                closeButton: true,
                type: toast.TYPE.ERROR,
            });
            this.setState({isLoading: false})
        }
    }


    render() {
        const {categories, isLoading, error, clicked, images} = this.state;

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
        if (categories !== []) {
            let preparedImages = [];
            for (let img in images) {
                preparedImages.push({
                    src: images[img]["path"] + images[img]["full"] + images[img]["name"],
                    title: images[img]["title"],
                    description: images[img]["description"]
                })
            }
            return (
                <div className="container">
                    <Filter
                        categories={categories}
                        onFilterChange={this.onFilterChange}
                        clicked={clicked}
                    />
                    <Lightbox
                        images={preparedImages}
                        renderImageFunc={(idx, image, toggleLightbox) => {
                            return (
                                <div className="container-img">
                                    <img
                                        key={idx}
                                        src={image.src}
                                        className='img-circle'
                                        onClick={toggleLightbox.bind(null, idx)}
                                    />
                                </div>
                            )
                        }}/>
                </div>
            )
        }
    }
}

export default Gallery