import React, {Component} from "react";
import {Card, Image, Button} from "semantic-ui-react";
import '../styles/components/cardPhoto.css'
import {toast} from "react-toastify";
import AddPhoto from "./addPhoto";
import EditPhoto from "./editPhoto";


class CardPhoto extends Component {
    constructor(props) {
        super(props);
        this.state = {
            images: [],
            isLoading: false,
            error: null,
        };
    }

    addCard = item => {
        const {images} = this.state;
        this.setState({images: [...images, item]});
        console.log(this.state.images)
    };

    updateCard

    deleteCard = id => {
        const {images} = this.state;
        fetch('http://qwe.loc/photo/delete', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({id: id})
        })
            .then(response => response.json())
            .then((data) => {
                if (data["status"] === "success") {
                    toast("Photo successful deleted", {
                        autoClose: 5000,
                        closeButton: true,
                        type: toast.TYPE.SUCCESS,
                    });
                    this.setState({
                        images: images.filter(item => item.id !== id)
                    })
                } else {
                    toast("Photo didn't delete", {
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
        fetch('http://qwe.loc/photo/list')
            .then(response => response.json())
            .then(response => {
                if (response["status"] === "success") {
                    this.setState({images: response["data"], isLoading: false});
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
        const {category} = this.props;
        if (this.state.isLoading) {
            return <p>Loading...</p>;
        }
        if (this.state.error) {
            return <p>{this.state.error.message}</p>;
        }
        return (
            <div className="settings-photo">
                <AddPhoto
                    category={category}
                    addCard={this.addCard}
                />
                <Card id="card">
                    {this.state.images.map(card => (
                        <Card.Content key={card.id} id="card-container">
                            < Image
                                src={card.path}
                                id={card.id}
                                className="card-photo"
                            />
                            <div id='group-btn-photo'>
                                <EditPhoto
                                    category={category}
                                    id={card.id}
                                />
                                <Button
                                    id="card-btn-delete"
                                    content="Delete"
                                    onClick={() => {
                                        this.deleteCard(card.id)
                                    }}
                                />
                            </div>
                        </Card.Content>
                    ))}
                </Card>
            </div>
        )
    }
}

export default CardPhoto;