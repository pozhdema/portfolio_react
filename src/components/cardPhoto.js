import React, {Component} from "react";
import {Card, Image, Button} from "semantic-ui-react";
import '../styles/components/cardPhoto.css'


class CardPhoto extends Component {

    render() {
        const {images, isLoading, error} = this.props;
        console.log(images)
        if (isLoading) {
            return <p>Loading...</p>;
        }
        if (error) {
            return <p>{error.message}</p>;
        }
        return (
            <Card className="card">
                {images.map(card => (
                    <Card.Content extra key={card.id} className="card-container">
                        <div className='ui two buttons'>
                            <Button className="btn-input card-btn">
                                Edit
                            </Button>
                            <Button className="btn-input card-btn">
                                Delete
                            </Button>
                            < Image
                                src={card.path}
                                id={card.id}
                                className="card-photo"
                            />
                        </div>
                    </Card.Content>
                ))}
            </Card>
        )
    }
}

export default CardPhoto;