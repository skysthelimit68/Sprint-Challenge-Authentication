import React from 'react';
import { Button, Form, Input } from 'reactstrap';
import axios from 'axios';

class RegisterForm extends React.Component {
    state = {
        username: "",
        password: "",
        status: this.props.loggedIn, 
        error: ""
    }

    componentDidMount() {
        if(localStorage.getItem("token")) this.props.history.push("/jokes")
    }

    updateField = event => {
        this.setState({
            [event.target.name] : event.target.value
        })
    }

    handleSubmit = event => {
        event.preventDefault();
        const creds = {username : this.state.username, password: this.state.password};
        console.log(creds)
        axios.post('http://localhost:3300/api/register/', creds)
        .then( res => {
            console.log(res)
            localStorage.setItem("token", res.data.token);
            this.props.updateStatus(true);

            this.props.history.push('/jokes');
            this.setState({
                username:"",
                password:"",
                status: true,
                error: ""
            })
        })
        .catch( error => {
            console.log("handleSubmit error: ", error.message)
            this.setState({
                error: "Please provide valid credential"
            })
        })
    }

    render() {
        const message = this.state.error !== "" ? this.state.error :  "";
        const messageClass = message === "" ? "hidden": "" ;

        if(this.state.status ) {
            return <h2>You are logged in. Go check out some Dad Jokes!</h2>
        } else {
            return(
                <div className="mainWrapper">
                    <h2 className={messageClass}>{message}</h2>
                    <div className="formWrapper">
                    
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
                </div>
                </div>
                
            
        )
        }
        
    }
}

export default RegisterForm;