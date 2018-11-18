import axios from 'axios';
import MasterService from './MasterService';
const authHeader = {
  headers: {
    'Authorization': localStorage.getItem('satellizer_token')
  }
}

export default class UserService extends MasterService {


  constructor() {
    super();
    this.url = `${this.baseURL}/api/user`
  }

  updateUser(user) {

    axios.put(this.url, user, authHeader)
      .then()
      .catch((err) => {
        console.log(err);
      });
  }

  loadUser() {
    return axios.get(this.url, authHeader);
  }

  loadUserSettings() {
    return axios.get(`${this.url}/settings`, authHeader);
  }
}
