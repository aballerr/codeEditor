
// the purpose of this file is to centralize the baseurl to one file.
// Because they all have the same baseurl login, there's not need to 
// create it serarately for every file

export default class MasterService {

  constructor() {
    this.baseURL =  window.location.hostname === 'localhost' ? 'http://localhost:4500' : '';
  }
}