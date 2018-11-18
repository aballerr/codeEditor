import React, { Component } from 'react';
import styled from 'styled-components';
import AuthService from '../../Services/AuthService';
import codeFileService from '../../Services/CodeFileService';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';


const ListWrap = styled.div`
  width: 500px;
  margin-left: auto;
  margin-right: auto;
  border: 1px solid lightgray;
  box-sizing: border-box;
  padding: 10px;
`
const Link = styled.a`
  text-decoration: none;
`

class HomePage extends Component {

  constructor(props) {
    super(props);
    this.authService = new AuthService()
    this.codeFileService = new codeFileService();
    this.state = { codeFiles: [] }
  }

  async componentDidMount() {

    this.codeFileService.loadAllCodeFiles()
      .then((response) => this.setState({ codeFiles: response.data }))
      .catch();
  }


  renderCodeFiles() {
    let codeFiles = this.state.codeFiles;
    let arrCodeFiles = []

    for (let codeFile of codeFiles) {
      codeFile.filename = codeFile.filename  ?  codeFile.filename : 'Untitled' ;
      arrCodeFiles.push(
        <Link key={codeFile.id} href={`editor/${codeFile.id}`}>
          <ListItem obj={codeFile.id + ''} onClick={(e) => this.onClick(e)} button>
            <ListItemText primary={codeFile.filename}>
            </ListItemText>
          </ListItem>
        </Link>
      )
    }

    arrCodeFiles.push(
      <div key={codeFiles.length+1}>
        <Divider />
        <Link >
          <ListItem button onClick={this.createNewFile}>
            <ListItemText primary={<><i className="far fa-file-alt"></i><span style={{marginLeft: 10}}> Create New File </span></>} >
            </ListItemText>
          </ListItem>
        </Link>
      </div>
    )
    return arrCodeFiles;
  }

  createNewFile = () => {
    this.codeFileService.createCodeFile()
    .then((response) => {
      window.location.href = `/editor/${response.data}`;
  
    })
    .catch((err) => {

    })
  }


  render() {
    return (
      <ListWrap>
        <List>
          {this.renderCodeFiles()}
        </List>

      </ListWrap>

    );
  }
}

export default HomePage;
