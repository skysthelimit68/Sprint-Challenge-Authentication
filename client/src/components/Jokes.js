import React from 'react';
import Joke from './Joke';
import { axiosWithAuth } from '../axiosWithAuth';

class Jokes extends React.Component {
    state = {
        jokes: []
    }

    componentDidMount() {
       this.getJokes();
    }

    getJokes = async() => {
        const jokes = await axiosWithAuth().get('http://localhost:3300/api/jokes/')
        this.setState({
            jokes : jokes.data
        })
        console.log(this.state.jokes)
    }

    
    render() {
        return(
            <div className="jokesWrapper">
                
                {this.state.jokes.map(joke => <Joke joke={joke} key={joke.id}/>)}
            </div>
        )
    }
}

export default Jokes;