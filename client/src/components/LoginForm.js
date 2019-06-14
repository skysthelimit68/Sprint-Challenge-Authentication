import React from 'react';
import { Button, Form, Input } from 'reactstrap';
import axios from 'axios';

class LoginForm extends React.Component {
    state = {
        username: "",
        password: ""
    }

    updateField = event => {
        this.setState({
            [event.target.name] : event.target.value
        })
    }

    handleSubmit = event => {
        event.preventDefault();
        const creds = this.state;
        axios.post('http://localhost:3300/api/login/', creds)
        .then( res => {
            localStorage.setItem("token", res.data.token);
            this.props.history.push('/jokes');
            console.log(res)
            this.setState({
                username:"",
                password:""
            })
        })
        .catch( error => {
            console.log(error)
        })
    }

    render() {
        return(
            <Form onSubmit={this.handleSubmit}>
                 <Input
                    type="text"
                    name="username"
                    placeholder="username"
                    onChange={this.updateField}
                    value={this.state.username}
                 />
                 <Input
                    type="password"
                    name="password"
                    placeholder="password"
                    onChange={this.updateField}
                    value={this.state.password}
                 />
                 <Button type="submit">Login</Button>
            </Form>
        )
    }
}

export default LoginForm;