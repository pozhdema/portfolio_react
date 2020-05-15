import React, {Component} from "react";
import { Container } from 'semantic-ui-react'
import '../styles/pages/settings.css';
import Add from "../components/add";
import View from "../components/view";
import {toast} from "react-toastify";

class Settings extends Component {
    initialState = {
        category: [
            {
                title_ua: "",
                title_en: ""
            }
        ],
        categories: []
    };

    state = this.initialState;

    addRow = categoryItem => {
        const {category} = this.state;

        this.setState({category: [...category, categoryItem]})
    };

    updateRow = (id, updatedCategoryItem) => {
        const {category} = this.state;

        this.setState({
            category: category.map(categoryItem => (categoryItem.title === id ? updatedCategoryItem : categoryItem)),
        })
    };

    deleteRow = id => {
        const {category} = this.state;

        this.setState({
            category: category.filter(categoryItem => categoryItem.title !== id),
        })
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
        const {categories} = this.state;
        const data = categories.length === 0? []: categories;

        return (
            <Container className="container settings">
                <Add addRow={this.addRow}/>
                <View
                    data={data}
                    deleteRow={this.deleteRow}
                    updateRow={this.updateRow}
                />
            </Container>
        )
    }
}

export default Settings;