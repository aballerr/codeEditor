import axios from 'axios';
const authHeader = {
  headers: {
    'Authorization': localStorage.getItem('satellizer_token')
  }
}

export default class CodeFileService {
  constructor() {
    this.url = window.location.hostname === 'localhost' ? 'http://localhost:4500' : '';
    this.baseURL = `${this.url}/api/codeFile`
  }

  loadAllCodeFiles() {
    return axios.get(this.baseURL, authHeader);
  }

  getCodeFile(id) {
    return axios.get(`${this.url}/public-api/codeFile/id/${id}`);
  }

  createCodeFile() {
    return axios.post(this.baseURL, {}, authHeader);
  }

  updateCodeFile(state) {
    let codeFile = {
      id: state.id,
      fileType: state.fileType.toLocaleLowerCase(),
      filename: state.filename,
      code: state.code
    }
    return axios.put(`${this.baseURL}/${codeFile.id}`, codeFile, authHeader);
  }

  deleteCodeFile(id) {
    return axios.delete(`${this.baseURL}/${id}`, authHeader);
  }
}