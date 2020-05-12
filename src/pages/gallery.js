import React, {Component} from 'react'
import Filter from "../components/filter";
import '../styles/pages/gallery.css'
import {toast} from "react-toastify";

class Gallery extends Component {
    constructor(props) {
        super(props);

        this.state = {
            categories: [],
            isLoading: false,
            error: null,
            clicked: false
        };
    }

    onFilterChange = (id) => {
        this.setState({clicked: id})
    };

    componentDidMount() {
        this.setState({isLoading: true});

        fetch('http://qwe.loc/categories/list')
            .then(response => response.json())
            .then(response => {
                if (response["status"] === "success") {
                    this.setState({categories: response["data"], isLoading: false});
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
        const {categories, isLoading, error, clicked} = this.state;
        if (isLoading) {
            return <p>Loading...</p>;
        }
        if (error) {
            return <p>{error.message}</p>;
        }
        if (categories !== []) {
            return (
                <div className="container">
                    <Filter
                        categories={categories}
                        onFilterChange={this.onFilterChange}
                        clicked={clicked}
                    />
                </div>
            )
        }
    }
}

export default Gallery