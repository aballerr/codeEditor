import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PrivateRoute from './Navigation/PrivateRoute';
import Nav from './Pages/Nav/Nav';
import HomePage from './Pages/HomePage/HomePage';
import CodeEditPage from './Pages/CodeEditPage/CodeEditPage';
import LoginPage from './Pages/LoginPage/LoginPage';
import SettingsPage from './Pages/SettingsPage/SettingsPage';
import './App.css';



class App extends Component {
  render() {
    return (
      <div>
        <Nav />
        <Router>
          <Switch>
            <Route path='/login' component={LoginPage} />
            <PrivateRoute path="/editor/:id" component={CodeEditPage} />
            <PrivateRoute path='/settings' component={SettingsPage} />
            <PrivateRoute path="/" component={HomePage} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
