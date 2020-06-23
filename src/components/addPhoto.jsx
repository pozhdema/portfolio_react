import React, {Component} from "react";
import {Button, Modal, Form, Dropdown} from "semantic-ui-react";
import '../styles/components/add.css'
import {toast} from "react-toastify";


class AddPhoto extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title_ua: "",
            title_en: "",
            description_ua: "",
            description_en: "",
            value: '',
            file: null,
            isOpen: false,
        };
        this.values = [];
        this.handleInput = this.handleInput.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    onClose = () => {
        this.setState({isOpen: false})
    };

    onOpen = () => {
        this.setState({isOpen: true})
    };

    handleInput = e => {
        this.setState({
            file: e.target.files[0]
        });
    };

    handleSelect = (e, {value}) => {
        this.values = {value};
    };

    handleChange = e => {
        const {name, value} = e.target;

        this.setState({
            [name]: value
        })
    };

    handleSubmit = e => {
        e.preventDefault();
        this.setState({isLoading: true});

        const formData = new FormData();
        formData.append("file", this.state.file);
        this.values.value.map(item => {
            formData.append('categories[]', item)
        });
        formData.append("title_ua", this.state.title_ua);
        formData.append("title_en", this.state.title_en);
        formData.append("description_ua", this.state.description_ua);
        formData.append("description_en", this.state.description_en);

        fetch("/api/photo/add", {
            method: "post",
            body: formData
        })
            .then(response => response.json())
            .then((data) => {
                if (data["status"] === "success") {
                    toast("Photo and category added", {
                        autoClose: 5000,
                        closeButton: true,
                        type: toast.TYPE.SUCCESS,
                    });
                    this.values = [];
                    this.props.addCard(data["data"]);
                    this.setState({
                        title_ua: "",
                        title_en: "",
                        description_ua: "",
                        description_en: ""
                    });
                    this.onClose()
                } else {
                    toast(data["message"], {
                        autoClose: 5000,
                        closeButton: true,
                        type: toast.TYPE.ERROR,
                    });
                }
            })
            .catch(error => console.error(error));
    };

    render() {
        const {category} = this.props;

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
                id="modal-add-photo-multiselect"
            />
        );

        return (
            <Modal
                trigger={<Button
                    id="add-btn-photo"
                    content="Add  New Photo"
                    onClick={() => {
                        this.onOpen();
                    }}
                />}
                id="modal-add-photo"
                open={this.state.isOpen}
                onClose={this.onClose}
            >
                <Modal.Header id="modal-add-photo-header">Add New Photo</Modal.Header>
                <Modal.Content id="modal-add-photo-content">
                    <Form>
                        <Form.Field>
                            <Form.Input
                                type="file"
                                id="modal-add-photo-inputOne"
                                onChange={this.handleInput}
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
                            content="Save"
                            id="modal-add-photo-btn"
                            onClick={this.handleSubmit}
                        />
                    </Form>
                </Modal.Content>
            </Modal>
        )
    }
}

export default AddPhoto;