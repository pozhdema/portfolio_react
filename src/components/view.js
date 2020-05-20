import React, {Component} from 'react'
import {Table, Button} from 'semantic-ui-react'
import Edit from "./edit";
import '../styles/components/view.css'

class View extends Component {
    state = {
        isOpen: false,
        id: '',
    };

    onClose = () => {
        this.setState({isOpen: false})
    };

    render() {
        const {isOpen, id} = this.state;
        const {data, deleteRow, updateRow,  getCategoryById} = this.props;
        return (
            <div className="table-container">
                <Edit
                    onClose={this.onClose}
                    isOpen={isOpen}
                    id={id}
                    updateRow={updateRow}
                    getCategoryById={getCategoryById}
                />
                <Table id="table-view" sortable celled fixed>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell id="table-view-header">Title_ua</Table.HeaderCell>
                            <Table.HeaderCell id="table-view-header">Title_en</Table.HeaderCell>
                            <Table.HeaderCell id="table-view-header">Actions</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {data.map(row => (
                            <Table.Row key={row.id}>
                                <Table.Cell>{row.title_ua}</Table.Cell>
                                <Table.Cell>{row.title_en}</Table.Cell>
                                <Table.Cell>
                                    <Button
                                        content="Edit"
                                        id="action-edit"
                                        onClick={() => {
                                            this.setState({
                                                isOpen: true,
                                                id: row.id,
                                            });
                                        }}
                                    />
                                    <Button
                                        content="Delete"
                                        id="action-delete"
                                        onClick={() => {
                                            deleteRow(row.id)
                                        }}
                                    />
                                </Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table>
            </div>
        )
    }
}

export default View
