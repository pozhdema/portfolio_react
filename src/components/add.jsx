import React, {Component} from "react";
import {Form, Modal, Button} from 'semantic-ui-react'
import "../styles/components/add.css"

class Add extends Component {
    initialState = {
        category: {
            title_ua: '',
            title_en: '',
        },
    };

    state = this.initialState;

    handleChange = event => {
        const {name, value} = event.target;

        this.setState({
            category: {...this.state.category, [name]: value},
        })
    };

    handleSubmit = e => {
        e.preventDefault();

        const {title_ua, title_en} = this.state.category;
        const {addRow} = this.props;

        const newCategory = {
            title_ua,
            title_en,
        };

        addRow(newCategory);

        this.setState(this.initialState);
    };

    render() {
        const {title_ua, title_en} = this.state.category;
        const { isOpen, onClose, onOpen } = this.props;
        return (
            <Modal
                trigger={<Button
                    id="add-btn"
                    content="Add  New Category"
                    onClick={() => {
                        onOpen();
                    }}
                />}
                open={isOpen}
                onClose={onClose}
                id="modal-add-category"
            >
                <Modal.Header id="modal-add-category-header">Add New Category</Modal.Header>
                <Modal.Content id="modal-add-category-content">
                    <Form
                        onSubmit={this.handleSubmit}
                    >
                        <Form.Field>
                            <Form.Input
                                placeholder="title_ua"
                                name="title_ua"
                                value={this.state.title_ua}
                                onChange={this.handleChange}
                                id="modal-add-category-inputOne"
                            />
                        </Form.Field>
                        <Form.Field>
                            <Form.Input
                                placeholder="title_en"
                                name="title_en"
                                value={this.state.title_en}
                                onChange={this.handleChange}
                                id="modal-add-category-inputTwo"
                            />
                        </Form.Field>
                        <Button
                            type="submit"
                            content="Submit"
                            id="modal-add-category-btn"
                            disabled={!title_ua || !title_en}
                            onClick={this.handleSubmit}
                        />
                    </Form>
                </Modal.Content>
            </Modal>
        )
    }
}

export default Add;