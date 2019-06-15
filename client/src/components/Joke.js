import React from "react";
import {Card, CardText, CardBody, CardTitle, CardSubtitle } from 'reactstrap';

const Joke = props => {
    return (
        <Card>
            <CardBody>
                <CardTitle>{props.joke.id}</CardTitle>
                <CardSubtitle>by Some Random Dad</CardSubtitle>
                <CardText>{props.joke.joke}</CardText>
            </CardBody>
            
        </Card>
    )
}

export default Joke;