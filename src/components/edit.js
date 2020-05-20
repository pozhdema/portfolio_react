import React, { Component } from 'react'
import { Form, Modal, Button } from 'semantic-ui-react'
import FontAwesome from "react-fontawesome";

class Edit extends Component {
    initialState = {
        category: {
            title_ua: "",
            title_en: "",
        }
    };

    state = this.initialState;

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.id !== this.props.id) {
            const item = this.props.getCategoryById(this.props.id);

            this.setState({
                category: {
                    title_ua: item.title_ua,
                    title_en: item.title_en,
                },
            })
        }
    }

    handleChange = event => {
        const { name, value } = event.target;

        this.setState({
            category: { ...this.state.category, [name]: value },
        })
    };

    handleSubmit = event => {
        event.preventDefault();

        const { title_ua, title_en } = this.state.category;
        const { updateRow, id } = this.props;
        const updatedCategoryItem = {
            title_ua,
            title_en,
            id
        };

        updateRow(this.props.id, updatedCategoryItem);
        this.props.onClose()
    };

    render() {
        const {title_ua, title_en} = this.state.category;
        const { isOpen, onClose} = this.props;

        return (
            <Modal
                open={isOpen}
                onClose={onClose}
                closeIcon={<FontAwesome name="window-close" className="fas fa-window-close"/>}
            >
                <Modal.Header>Edit User</Modal.Header>
                <Modal.Content>
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Field>
                            <Form.Input
                                name="title_ua"
                                value={title_ua}
                                onChange={this.handleChange}
                            />
                        </Form.Field>
                        <Form.Field>
                            <Form.Input
                                name="title_en"
                                value={title_en}
                                onChange={this.handleChange}
                            />
                        </Form.Field>
                        <Button
                            type="submit"
                            content="Submit"
                            className="btn-input"
                        />
                    </Form>
                </Modal.Content>
            </Modal>
        )
    }
}

export default Edit