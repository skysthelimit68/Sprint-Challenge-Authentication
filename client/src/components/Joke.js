import React from "react";

const Joke = props => {
    return (
        <div>
            {props.joke.id}{' '}{props.joke.joke}
        </div>
    )
}

export default Joke;