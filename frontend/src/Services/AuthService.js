const axios = require('axios');
const authHeader = {
  headers: {
    'Authorization': localStorage.getItem('satellizer_token')
  }
}


export default class AuthService {
  constructor() {
    this.url = window.location.hostname === 'localhost' ? 'http://localhost:4500' : '';
  }

  login(user) {
    return axios.post(`${this.url}/public-api/authenticate`, user);
  }

  isLoggedIn() {
    return axios.get('http://localhost:4500/api/isAuthenticated', authHeader);
  }
}
