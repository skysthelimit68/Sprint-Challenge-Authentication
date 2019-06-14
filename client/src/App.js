import React from 'react';
//import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, NavLink, withRouter } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import Jokes from './components/Jokes';
import PrivateRoute from './PrivateRoute';
import {Button} from 'reactstrap';


class App extends React.Component{
  state = {
    loggedIn: false
  }
  handleLogout = event => {
    event.preventDefault();
    localStorage.removeItem("token");
    
    this.props.history.push('/login');
    this.updateStatus(false);
  }

  updateStatus = status => {
    this.setState({
      loggedIn: status
    })
  }
  

  render(){

    const btnClass = this.state.loggedIn? "" : "hidden";

    return (
    <div className="App">
      <header>
        <NavLink to="/login">Login</NavLink>
        <NavLink to="/register">Register</NavLink>
        <NavLink to="/jokes">Read Jokes</NavLink>
        <Button className={btnClass} onClick={this.handleLogout}>Logout</Button>
      </header>
      <Route 
      path="/login" 
      render={(props) => <LoginForm {...props} updateStatus={this.updateStatus} loggedIn={this.state.loggedIn}/> }
      />
      <Route 
      path="/register" 
      render={(props) => <RegisterForm {...props} updateStatus={this.updateStatus} loggedIn={this.state.loggedIn}/>} 
      />
      <PrivateRoute path="/jokes" component={Jokes} />
    </div>
  );
  }
  
}

export default withRouter(App);
