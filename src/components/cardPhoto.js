import React, {Component} from "react";
import {Card, Image, Button} from "semantic-ui-react";
import '../styles/components/cardPhoto.css'


class CardPhoto extends Component {

    render() {
        const {images, isLoading, error} = this.props;

        if (isLoading) {
            return <p>Loading...</p>;
        }
        if (error) {
            return <p>{error.message}</p>;
        }
        return (
            <Card id="card">
                {images.map(card => (
                    <Card.Content key={card.id} id="card-container">
                        < Image
                            src={card.path}
                            id={card.id}
                            className="card-photo"
                        />
                        <div className='ui two buttons'>
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
        )
    }
}

export default CardPhoto;