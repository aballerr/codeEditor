import React, { Component } from "react";
import styled from "styled-components";
import AuthService from "../../Services/AuthService";


let Navbar = styled.nav`
  height: 40px;
  width: 100%;
  background-color: #ffffff;
  margin-bottom: 100px;
  display: flex;
  line-height: 90px;
`;

let Link = styled.a`
  text-decoration: none;
`;

let Login = styled.div`
  position: absolute;
  right: 50px;
  font-size: 30px;
  color: black;
  cursor: pointer;
`;

let Head = styled.h3`
  margin: 0;
  padding: 0;
  margin-left: 48px;
  font-size: 22px;
  font-weight: bold;
  color: black;
`;

let Container = styled.div`
  margin-left: 20px;
  display: flex;
  height: 100%;
`;

let Settings = styled.span`
  font-size: 30px;
  color: black;
  position: absolute;
  right: 200px;
`;

class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = { isLoggedIn: true };
    this.authService = new AuthService("http://localhost:4500/");
  }

  componentDidMount() {
    this.authService
      .isLoggedIn()
      .then(response => {
        this.setState({ isLoggedIn: true });
      })
      .catch(() => {
        this.setState({ isLoggedIn: false });
      });
  }

  isLoggedIn = () => {
    if (this.state.isLoggedIn) {
      localStorage.clear();
      window.location.href = "/";
    } else {
      window.location.href = "/login";
    }
  };

  render() {
    return (
      <Navbar>
        <Link href="/">
          <Container>
            <Head>CODE EDITOR</Head>
          </Container>
        </Link>
        <Link href="/settings">
          <Settings>Settings</Settings>
        </Link>
        <Link onClick={this.isLoggedIn}>
          <Login>{this.state.isLoggedIn ? "Logout" : "Login"}</Login>
        </Link>
      </Navbar>
    );
  }
}

export default Nav;
