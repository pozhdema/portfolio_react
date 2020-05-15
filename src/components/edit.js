import React, { Component } from 'react'
import { Form, Modal, Button } from 'semantic-ui-react'

class Edit extends Component {
    initialState = {
        form: {
            title_ua: '',
            title_en: '',
        },
    };

    state = this.initialState;

    handleChange = event => {
        const { name, value } = event.target;

        this.setState({
            form: { ...this.state.form, [name]: value },
        })
    };

    handleSubmit = event => {
        event.preventDefault();

        const { title_ua, title_en } = this.state.form;
        const { updateRow } = this.props;

        const updatedCategoryItem = {
            title_ua,
            title_en,
        };

        updateRow(this.props.id, updatedCategoryItem);
        this.props.onClose()
    };

    render() {
        const { title_ua, title_en } = this.state.form;
        const { isOpen, onClose } = this.props;

        return (
            <Modal open={isOpen} onClose={onClose} closeIcon>
                <Modal.Header>Edit User</Modal.Header>
                <Modal.Content>
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Field>
                            <Form.Input
                                placeholder="title_ua"
                                name="name"
                                value={title_ua}
                                onChange={this.handleChange}
                            />
                        </Form.Field>
                        <Form.Field>
                            <Form.Input
                                placeholder="title_ua"
                                name="name"
                                value={title_en}
                                onChange={this.handleChange}
                            />
                        </Form.Field>
                        <Button
                            type="submit"
                            content="Submit"
                        />
                    </Form>
                </Modal.Content>
            </Modal>
        )
    }
}

export default Edit