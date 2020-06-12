import React, {Component} from "react";
import {Button, Form, Modal, Checkbox, Dropdown} from "semantic-ui-react";
import {toast} from "react-toastify";
import '../styles/components/add.css'
import '../styles/components/cardPhoto.css'

class EditPhoto extends Component {
    constructor(props) {
        super(props);
        this.state = {
            slider: false,
            visible: false,
            value: '',
            isOpen: false,
            categories: [],
            title_ua: "",
            title_en: "",
            description_ua: "",
            description_en: ""
        };
        this.values = [];
    }

    onClose = () => {
        this.setState({isOpen: false})
    };

    onOpen = (id) => {
        fetch("https:api.pozhdema.in.ua/photo/getPhoto", {
            method: "post",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({id: id})
        })
            .then(response => response.json())
            .then((data) => {
                if (data["status"] === "success") {
                    this.values = data.data.categories;
                    this.setState({
                        visible: data.data.visible === "1",
                        slider: data.data.slider === "1",
                        title_ua: data.data.title_ua,
                        title_en: data.data.title_en,
                        description_ua: data.data.description_ua,
                        description_en: data.data.description_en,
                        categories: data.data.categories
                    });
                } else {
                    toast(data["message"], {
                        autoClose: 5000,
                        closeButton: true,
                        type: toast.TYPE.ERROR,
                    });
                }
            })
            .catch(error => console.error(error));
        this.setState({isOpen: true})
    };

    handleSelect = (e, {value}) => {
        this.values = value;
    };

    handleVisible = () => {
        this.setState((prevState) => ({visible: !prevState.visible}))
    };

    handleVSlider = () => {
        this.setState((prevState) => ({slider: !prevState.slider}))
    };

    handleChange = e => {
        const {name, value} = e.target;

        this.setState({
            [name]: value
        })
    };

    handleSubmit = e => {

        fetch('http://qwe.loc/photo/update', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                visible: this.state.visible === true ? 1 : 0,
                slider: this.state.slider === true ? 1 : 0,
                categories: this.values,
                id: this.props.id,
                title_ua: this.state.title_ua,
                title_en: this.state.title_en,
                description_ua: this.state.description_ua,
                description_en: this.state.description_en
            })
        })
            .then(response => response.json())
            .then((data) => {
                if (data["status"] === "success") {
                    toast("Photo successful edit", {
                        autoClose: 5000,
                        closeButton: true,
                        type: toast.TYPE.SUCCESS,
                    });

                    this.onClose()
                } else {
                    toast("Photo didn't edit", {
                        autoClose: 5000,
                        closeButton: true,
                        type: toast.TYPE.ERROR,
                    });
                }
            })
            .catch(error => console.error(error));

        this.onClose()
    };


    render() {
        const {category, id} = this.props;

        let options = [];
        for (let i in category) {
            options.push({key: category[i].id + "_opt", text: category[i].title_en, value: category[i].id})
        }
        const DropdownMultipleSelection = () => (
            <Dropdown
                placeholder='Category'
                fluid
                multiple
                selection
                options={options}
                onChange={this.handleSelect}
                closeOnChange={true}
                defaultValue={this.state.categories}
            />
        );
        return (
            <Modal
                trigger={<Button
                    id="card-btn-edit"
                    content="Edit"
                    onClick={() => {
                        this.onOpen(id);
                    }}
                />}
                open={this.state.isOpen}
                onClose={this.onClose}
                id="modal-edit-photo"
            >
                <Modal.Header id="modal-edit-photo-header">Edit photo</Modal.Header>
                <Modal.Content id="modal-edit-photo-content">
                    <Form>
                        <Form.Field
                            className="modal-edit-photo-field "
                        >
                            <Checkbox
                                name="slider"
                                checked={this.state.slider}
                                label='On slider'
                                onChange={this.handleVSlider}
                            />
                            <Checkbox
                                name="visible"
                                checked={this.state.visible}
                                label='Is visible'
                                onChange={this.handleVisible}
                            />
                        </Form.Field>
                        <Form.Field>
                            <Form.Input
                                placeholder="title_ua"
                                name="title_ua"
                                value={this.state.title_ua}
                                onChange={this.handleChange}
                                id="modal-add-photo-title-ua"
                            />
                        </Form.Field>
                        <Form.Field>
                            <Form.Input
                                placeholder="title_en"
                                name="title_en"
                                value={this.state.title_en}
                                onChange={this.handleChange}
                                id="modal-add-photo-title-en"
                            />
                        </Form.Field>
                        <Form.Field>
                            <Form.Input
                                placeholder="description_ua"
                                name="description_ua"
                                value={this.state.description_ua}
                                onChange={this.handleChange}
                                id="modal-add-photo-description-ua"
                            />
                        </Form.Field>
                        <Form.Field>
                            <Form.Input
                                placeholder="description_en"
                                name="description_en"
                                value={this.state.description_en}
                                onChange={this.handleChange}
                                id="modal-add-photo-description-en"
                            />
                        </Form.Field>
                        <DropdownMultipleSelection/>
                        <Button
                            type="submit"
                            content="Submit"
                            id="modal-edit-photo-btn"
                            onClick={this.handleSubmit}
                        />
                    </Form>
                </Modal.Content>
            </Modal>
        )
    }
}

export default EditPhoto;