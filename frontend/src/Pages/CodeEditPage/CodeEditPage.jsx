import React, { Component } from "react";
import AceEditor from "react-ace";
import styled from "styled-components";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import CodeFileService from "../../Services/CodeFileService";
import UserService from '../../Services/UserService';
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import "brace/mode/javascript";
import "brace/mode/css";
import "brace/theme/terminal";
import "brace/ext/language_tools";
import "./CodeEditPage.css";

const Center = styled.div`
  margin-left: auto;
  margin-right: auto;
  margin-top: 70px;
  width: 90%;
  height: 40vh;
`;

const TempInput = styled.input`
  opacity: 0;
`;

class CodeEditPage extends Component {
  toggleModalVisibility = () => {
    this.setState(function (prevState) {
      return {
        visible: !prevState.visible
      };
    });
  };

  constructor(props) {
    super(props);
    this.state = {
      filename: "",
      code: "",
      visible: false,
      fileType: "Javascript",
      id: 0,
    };
    this.codeFileService = new CodeFileService();
    this.userService = new UserService();
  }

  copyLink = () => {
    let tempInput = document.getElementById("component-simple");
    let url = window.location === 'localhost' ?
      `http://localhost/public-api/codeFile/filename/${tempInput.value}` :
      `https://trelloclone.com/public-api/codeFile/fileName/${tempInput.value}`;


    if (this.state.fileType.toLowerCase() === "javascript") {

      tempInput.value = `<script src="${url}"></script>`
    } else {

      tempInput.value = `<link rel="stylesheet" type="text/css" href="${url}"></link>`;
    }

    tempInput.select();
    document.execCommand("copy");
  };

  deleteFile = () => {
    this.codeFileService
      .deleteCodeFile(this.state.id)
      .then(response => (window.location.href = "/"))
      .catch(err => console.log(err));
  };

  handleChange = event => {
    if (event.target.name === "filename") {
      event.target.value = event.target.value.replace(/ /g, "");
    }

    this.setState({ [event.target.name]: event.target.value }, () => {
      this.codeFileService
        .updateCodeFile(this.state)
        .then()
        .catch(err => console.log(err));
    });
  };

  componentDidMount() {
    let id = window.location.pathname.replace(/\/editor\//, "");

    this.codeFileService
      .getCodeFile(id)
      .then(response => {
        let fileType =
          response.data.fileType === "javascript" ? "Javascript" : "CSS";
        let filename = response.data.filename || "";
        let code = response.data.code || "";
        this.setState({
          filename: filename,
          code: code,
          fileType: fileType,
          id: response.data.id
        });
      })
      .catch(err => console.log(err));

    this.userService.loadUserSettings()
      .then((response) => {
        this.setState(response.data);
      })
      .catch((err) => console.log(err));
  }

  render() {
    return (
      <div className="codeEditPage">
        <Center>
          <FormControl style={{ marginBottom: "10px" }}>
            <InputLabel htmlFor="component-simple">File Name</InputLabel>
            <Input
              id="component-simple"
              name="filename"
              value={this.state.filename}
              onChange={e => this.handleChange(e)}
            />
          </FormControl>
          <div
            style={{
              display: "inline-block",
              marginTop: "17px",
              marginLeft: "13px",
              padding: "0"
            }}
          >
            <Select
              value={this.state.fileType}
              inputProps={{
                name: "fileType"
              }}
              onChange={this.handleChange}
            >
              <MenuItem value="Javascript">Javascript</MenuItem>
              <MenuItem value="CSS">CSS</MenuItem>
            </Select>
          </div>
          <i onClick={this.copyLink} className="fas fa-copy" />
          <AceEditor
            onChange={e => {
              let event = { target: {} };
              event.target.name = "code";
              event.target.value = e;
              this.handleChange(event);
            }}
            ref="aceEditor"
            mode={this.state.fileType.toLowerCase()}
            theme="terminal"
            value={this.state.code}
            name="code"
            width="100%"
            height="100%"
            fontSize={this.state.fontSize}
            enableLiveAutocompletion={this.state.liveAutocomplete}
            showGutter={this.state.showGutter}
            tabSize={this.state.tabSpacing}
            showLineNumbers={this.state.showLineNumber}
            highlightActiveLine={this.state.highlightActiveLine}
          />
          <TempInput id="tempInput" />
        </Center>
      </div>
    );
  }
}

export default CodeEditPage;
