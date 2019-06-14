import React from 'react';
import { Button, Form, Input } from 'reactstrap';
import axios from 'axios';

class RegisterForm extends React.Component {
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
        console.log(creds)
        axios.post('http://localhost:3300/api/register/', creds)
        .then( res => {
            console.log(res)
            localStorage.setItem("token", res.data.token);
            this.props.history.push('/jokes');
            this.setState({
                username:"",
                password:""
            })
        })
        .catch( error => {
            console.log("handleSubmit error: ", error.message)
        })
    }

    render() {
        return(
            <Form>
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
                 <Button onClick={this.handleSubmit}>Register</Button>
            </Form>
        )
    }
}

export default RegisterForm;