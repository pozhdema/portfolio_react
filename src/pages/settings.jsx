import React, {Component} from "react";
import {Tab} from 'semantic-ui-react'
import Add from "../components/add";
import View from "../components/view";
import {toast} from "react-toastify";
import CardPhoto from "../components/cardPhoto";
import '../styles/pages/settings.css'


class Settings extends Component {
    initialState = {
        category: [
            {
                title_ua: "",
                title_en: ""
            }
        ],
        categories: [],
        isOpen: false,
        isLoading: false,
        error: null,
    };

    state = this.initialState;

    onClose = () => {
        this.setState({isOpen: false})
    };

    onOpen = () => {
        this.setState({isOpen: true})
    };

    getCategoryById = id => {
        const {categories} = this.state;

        const u = categories.filter(item => item.id === id);

        return u[0]
    };

    addRow = categoryItem => {
        const {categories} = this.state;
        fetch('/api/categories/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(categoryItem)
        })
            .then(response => response.json())
            .then((data) => {
                if (data["status"] === "success") {
                    toast("Category successful added", {
                        autoClose: 5000,
                        closeButton: true,
                        type: toast.TYPE.SUCCESS,
                    });
                    categoryItem["id"] = data.data.id;
                    this.setState({categories: [...categories, categoryItem]});
                    this.onClose()
                } else {
                    toast("Category didn't add", {
                        autoClose: 5000,
                        closeButton: true,
                        type: toast.TYPE.ERROR,
                    });
                }
            })
            .catch(error => console.error(error));
    };

    updateRow = (id, updatedCategoryItem) => {
        const {categories} = this.state;
        fetch('/api/categories/update', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedCategoryItem)
        })
            .then(response => response.json())
            .then((data) => {
                if (data["status"] === "success") {
                    toast("Category successful edit", {
                        autoClose: 5000,
                        closeButton: true,
                        type: toast.TYPE.SUCCESS,
                    });
                    this.setState({
                        categories: categories.map(categoryItem => (categoryItem.id === id ? updatedCategoryItem : categoryItem)),
                    });
                    this.onClose()
                } else {
                    toast("Category didn't edit", {
                        autoClose: 5000,
                        closeButton: true,
                        type: toast.TYPE.ERROR,
                    });
                }
            })
            .catch(error => console.error(error));
    };

    deleteRow = id => {
        const {categories} = this.state;
        fetch('/api/categories/delete', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({id: id})
        })
            .then(response => response.json())
            .then((data) => {
                if (data["status"] === "success") {
                    toast("Category successful deleted", {
                        autoClose: 5000,
                        closeButton: true,
                        type: toast.TYPE.SUCCESS,
                    });
                    this.setState({
                        categories: categories.filter(item => item.id !== id)
                    })
                } else {
                    toast("Category didn't delete", {
                        autoClose: 5000,
                        closeButton: true,
                        type: toast.TYPE.ERROR,
                    });
                }
            })
            .catch(error => console.error(error));
    };

    componentDidMount() {
        this.setState({isLoading: true});

        fetch('/api/categories/list')
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
        const {categories, isOpen} = this.state;
        const data = categories.length === 0 ? [] : categories;
        const panes = [
            {
                menuItem: 'Category',
                render: () => <Tab.Pane attached={false} className="settings">
                    <div className="settings-category">
                        <Add
                            isOpen={isOpen}
                            addRow={this.addRow}
                            onClose={this.onClose}
                            onOpen={this.onOpen}
                        />
                        <View
                            data={data}
                            deleteRow={this.deleteRow}
                            updateRow={this.updateRow}
                            getCategoryById={this.getCategoryById}
                        />
                    </div>
                </Tab.Pane>,
            },
            {
                menuItem: 'Photo',
                render: () => <Tab.Pane attached={false} className="settings">
                    <div >
                        <CardPhoto
                            category={data}
                        />
                    </div>
                </Tab.Pane>,
            }
        ];

        const TabSecondaryPointing = () => (
            <Tab menu={{secondary: true, pointing: true}} panes={panes}/>
        );

        return (
            <TabSecondaryPointing/>
        )
    }
}

export default Settings;