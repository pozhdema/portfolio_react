import React, {Component} from "react";
import {Card, Image, Button} from "semantic-ui-react";
import '../styles/components/cardPhoto.css'
import {toast} from "react-toastify";
import AddPhoto from "./addPhoto";


class CardPhoto extends Component {
    constructor(props) {
        super(props);
        this.state = {
            images:[],
            isLoading: false,
            error: null,
        };
    }
    getListOfPhoto=()=> {
        fetch('http://qwe.loc/photo/list')
            .then(response => response.json())
            .then(response => {
                console.log(response);
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
    };
    componentDidMount() {
        this.getListOfPhoto()
    }

    render() {
        const {category}=this.props;
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
                    getListOfPhoto = {this.getListOfPhoto}
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
                                <Button id="card-btn-edit">
                                    Edit
                                </Button>
                                <Button id="card-btn-delete">
                                    Delete
                                </Button>
                            </div>
                        </Card.Content>
                    ))}
                </Card>
            </div>
        )
    }
}

export default CardPhoto;