import React, {Component} from "react";
import { Form, Modal, Button } from 'semantic-ui-react'
import "../styles/components/add.css"
import FontAwesome from "react-fontawesome";

class Add extends Component{
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
        const { addRow } = this.props;

        const newCategory = {
            title_ua,
            title_en,
        };

        addRow(newCategory);
        this.setState(this.initialState)
    };

    render() {
        const { title_ua, title_en } = this.state.form;

        return (
            <Modal className="modal" trigger={<Button content="Add  New Category" />} closeIcon={<FontAwesome name="window-close" className="fas fa-window-close"/>}>
                <Modal.Header>Add New Category</Modal.Header>
                <Modal.Content>
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Field>
                            <Form.Input
                                placeholder="title_ua"
                                name="name"
                                value={this.state.title_ua}
                                onChange={this.handleChange}
                                autoFocus={true}
                            />
                        </Form.Field>
                        <Form.Field>
                            <Form.Input
                                placeholder="title_en"
                                name="name"
                                value={this.state.title_en}
                                onChange={this.handleChange}
                            />
                        </Form.Field>
                        <Button type="submit" className="btn-input" content="Submit" disabled={!title_ua || !title_en} />
                    </Form>
                </Modal.Content>
            </Modal>
        )
    }
}

export default Add;