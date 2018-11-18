import React, { Component } from 'react';
import { Redirect, Route } from 'react-router-dom'
import LoginPage from '../Pages/LoginPage/LoginPage';
import AuthService from '../Services/AuthService';

class PrivateRoute extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      isLoggedIn: false
    }
    this.authService = new AuthService();
  }

  componentDidMount() {
    this.authService.isLoggedIn()
    .then(() => {
      this.setState({
        isLoading: false,
        isLoggedIn: true
      })
    })
    .catch(() => {
      this.setState({isLoading: false})
    })
  }

  render() {
    if (this.state.isLoading)
      return null;
    else if (this.state.isLoggedIn)
      return <Route path={this.props.path} component={this.props.component} />
    else return <Redirect to='/login' component={LoginPage} />
  }
}

export default PrivateRoute;
