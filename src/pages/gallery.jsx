import React, {Component} from 'react'
import Filter from "../components/filter";
import '../styles/pages/gallery.css'
import {toast} from "react-toastify";
import Loader from "react-loader-spinner";
import {SRLWrapper} from "simple-react-lightbox";
import {Button} from "semantic-ui-react";
import Translate from "react-translate-component";

class Gallery extends Component {
    state = {
        categories: [],
        isLoading: false,
        error: null,
        clicked: "0",
        images: [],
        offset: 0,
        limit: 10
    };


    onFilterChange = (id) => {
        fetch(`/api/photo/photo?category=${id}&offset=0&limit=10`)
            .then(response => response.json())
            .then(response => {
                if (response["status"] === "success") {
                    this.setState({
                        images: response["data"],
                        isLoading: false,
                        clicked: id,
                        offset: this.state.limit,
                    })
                }
            })
    };

    onLoader = ()=>{
        fetch(`/api/photo/photo?category=${this.state.clicked}&offset=${this.state.offset}&limit=${this.state.limit}`)
            .then(response => response.json())
            .then(response => {
                if (response["status"] === "success") {
                    let imList = this.state.images;
                    for (let i in response["data"]){
                        imList.push(response["data"][i])
                    }
                    this.setState({
                        images: imList,
                        offset: this.state.offset+this.state.limit
                    })
                }
            })
    }

    async componentDidMount() {
        this.setState({isLoading: true});
        try {
            let result = await Promise.all([
                fetch('/api/categories/list')
                    .then(response => response.json()),
                fetch('/api/photo/photo?offset=0&limit=10')
                    .then(response => response.json())

            ]);

            let category = result[0];
            let photo = result[1];

            if (category["status"] === "success" && photo["status"] === "success") {
                this.setState({
                    categories: category["data"],
                    isLoading: false,
                    images: photo["data"],
                    offset: this.state.offset+this.state.limit
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

        const options = {
            settings: {
                overlayColor: "rgba(0, 0, 0, 0.9)"
            },
            buttons: {
                backgroundColor: "rgba(69,69,69,0.62)",
                iconColor: "#ffccbb",
                showDownloadButton: false,
            },
            caption: {
                captionColor: "#e5dac3",
                captionFontFamily: "Caveat, CormorantInfant, SourceSansPro",
                captionFontWeight: "100",
                captionFontSize: "25px",
            }
        };
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
        if (categories.length) {
            let preparedImages = [];
            for (let img in images) {
                preparedImages.push({
                    src: images[img]["path"] + images[img]["full"] + images[img]["name"],
                    thumbnail: images[img]["path"] + images[img]["min"] + images[img]["name"],
                    caption: images[img]["title"],
                })
            }
            return (

                <div className="container">
                    <Filter
                        categories={categories}
                        onFilterChange={this.onFilterChange}
                        clicked={clicked}
                    />
                    <SRLWrapper options={options}>
                        <div className="container-photo" >
                            {preparedImages.map(({id, src, thumbnail, caption}) => (
                                <div key={id} className="photo">
                                    <a href={src}  data-attribute="SRL" key={id}>
                                        <img src={thumbnail} alt={caption} key={id} loading="lazy"/>
                                    </a>
                                </div>
                            ))}
                        </div>
                        <div className="container-loader">
                            <Translate
                                component={Button}
                                id={"loader"}
                                content="more"
                                onClick={this.onLoader}
                            />
                        </div>
                    </SRLWrapper>
                </div>

            )
        } else {
            return null
        }
    }
}

export default Gallery