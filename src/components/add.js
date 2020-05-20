import React, {Component} from "react";
import {Form, Modal, Button} from 'semantic-ui-react'
import "../styles/components/add.css"
import FontAwesome from "react-fontawesome";

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
                    className="admin-submit add"
                    content="Add  New Category"
                    onClick={() => {
                        onOpen();
                    }}
                />}
                closeIcon={<FontAwesome name="window-close" className="fas fa-window-close"/>}
                open={isOpen}
                onClose={onClose}
            >
                <Modal.Header>Add New Category</Modal.Header>
                <Modal.Content>
                    <Form
                        onSubmit={this.handleSubmit}
                    >
                        <Form.Field>
                            <Form.Input
                                placeholder="title_ua"
                                name="title_ua"
                                value={this.state.title_ua}
                                onChange={this.handleChange}
                                autoFocus={true}
                            />
                        </Form.Field>
                        <Form.Field>
                            <Form.Input
                                placeholder="title_en"
                                name="title_en"
                                value={this.state.title_en}
                                onChange={this.handleChange}
                            />
                        </Form.Field>
                        <Button
                            type="submit"
                            className="btn-input"
                            content="Submit"
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