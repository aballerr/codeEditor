import React, { Component } from "react";
import styled from "styled-components";
import AuthService from "../../Services/AuthService";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button/Button";

const Wrap = styled.div`
  border: 1px solid lightgray;
  width: 350px;
  margin-left: auto;
  margin-right: auto;
  background-color: white;
  padding: 40px 90px;
  text-align: center;
  margin-top: 100px;
`;

const Header = styled.label`
  font-size: 28px;
`;

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = { email: "", password: "" };
    this.authService = new AuthService();
  }

  handleChange = event =>
    this.setState({ [event.target.name]: event.target.value });

  login = () => {

    this.authService.login(this.state)
      .then((response) => {
        if (response.data.success) {
          localStorage.setItem('satellizer_token', response.data.token);
          window.location.href = "/";
        }
        else {
          console.log(response.data);
          console.log('invalid username and password');
        }
      })
      .catch((err) => {
        console.log('there was an error logging in');
        console.log(err);
      })
  };

  render() {
    return (
      <Wrap>
        <Header>Sign In</Header>
        <FormControl fullWidth>
          <InputLabel htmlFor="adornment-amount">Email</InputLabel>
          <Input
            value={this.state.email}
            name="email"
            onChange={e => this.handleChange(e)}
          />
        </FormControl>
        <FormControl fullWidth>
          <InputLabel htmlFor="adornment-amount">Password</InputLabel>
          <Input
            value={this.state.password}
            name="password"
            onChange={e => this.handleChange(e)}
            type="password"
          />
        </FormControl>
        <FormControl style={{ marginTop: "10px" }} fullWidth>
          <Button onClick={this.login} color="primary">
            Log In
          </Button>
        </FormControl>
      </Wrap>
    );
  }
}

export default LoginPage;
