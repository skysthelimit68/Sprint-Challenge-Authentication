import React from 'react';
import { Button, Form, Input } from 'reactstrap';
import axios from 'axios';

class LoginForm extends React.Component {
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
        const creds = this.state;
        axios.post('http://localhost:3300/api/login/', creds)
        .then( res => {
            localStorage.setItem("token", res.data.token);
            this.props.updateStatus(true);
            
            this.props.history.push('/jokes');
            console.log(res)
            this.setState({
                username:"",
                password:"",
                status:true,
                error: ""
            })
        })
        .catch( error => {
            console.log(error)
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
                        <Button onClick={this.handleSubmit}>Login</Button>
                    </Form>
                </div>
                </div>
                
            
            )
        }
        
    }
}

export default LoginForm;