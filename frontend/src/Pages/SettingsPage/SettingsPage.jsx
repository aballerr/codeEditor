import React, { Component } from 'react';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormHelperText from '@material-ui/core/FormHelperText';
import Switch from '@material-ui/core/Switch';
import styled from 'styled-components';
import UserService from '../../Services/UserService';


const Wrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const Center = styled.div`
  text-align: center;
  display: inline-block;
  padding: 30px;
`

const Header = styled.h5`
  padding: 0;
  margin: 0;
  font-size: 34px;
  margin-bottom: 55px;
`


class SettingsPage extends Component {

  constructor(props) {
    super(props);
    this.userService = new UserService();
    this.state = {
      fontSize: '14px',
      liveAutocomplete: false,
      showGutter: true,
      hightlightActiveLine: true,
      showLineNumber: true,
      tabSpacing: '2'
    }
  }

  componentDidMount() {

    this.userService.loadUser()
      .then((response) => {
        this.setState(response.data);
      })
      .catch((err) => {
        console.log(err);
      })
  }

  handleChange(event) {
    let key = event.target.name;
    let prevState = this.state[key];

    this.setState({ [key]: !prevState }, () => {
      this.userService.updateUser(this.state);
    });
  }

  handleDropDownChange = (e) => {
    this.setState({ [e.target.name]: e.target.value }, () => {
      this.userService.updateUser(this.state);
    });
  }

  render() {
    return (
      <Wrap>
        <Center>
          <Header>Text Editor Settings</Header>
          <FormGroup style={{ marginBottom: 40 }} row>
            <FormControl style={{ minWidth: 120 }} >
              <Select
                value={this.state.fontSize}
                onChange={(e) => this.handleDropDownChange(e)}
                displayEmpty
                name="fontSize"
              >
                <MenuItem value={'10px'}>10px</MenuItem>
                <MenuItem value={'12px'}>12px</MenuItem>
                <MenuItem value={'14px'}>14px</MenuItem>
                <MenuItem value={'16px'}>16px</MenuItem>
                <MenuItem value={'18px'}>18px</MenuItem>
                <MenuItem value={'20px'}>20px</MenuItem>
                <MenuItem value={'22px'}>22px</MenuItem>
              </Select>
              <FormHelperText>Font Size</FormHelperText>
            </FormControl>
            <FormControl style={{ minWidth: 120, marginLeft: 50, marginRight: 50 }}>
              <Select
                value={this.state.tabSpacing}
                onChange={(e) => this.handleDropDownChange(e)}
                displayEmpty
                name="tabSpacing"
              >
                <MenuItem value={'2'}>2 spaces</MenuItem>
                <MenuItem value={'4'}>4 spaces</MenuItem>
                <MenuItem value={'6'}>6 spaces</MenuItem>
              </Select>
              <FormHelperText>Tab Spacing</FormHelperText>
            </FormControl>
            <FormControlLabel
              control={
                <Switch
                  name="showGutter"
                  checked={this.state.showGutter}
                  onChange={(e) => this.handleChange(e)}
                  value={this.state.showGutter}
                />
              }
              label="Show gutter"
            />
          </FormGroup>
          <FormGroup row>
            <FormControlLabel
              control={
                <Switch
                  name="liveAutocomplete"
                  checked={this.state.liveAutocomplete}
                  onChange={(e) => this.handleChange(e)}
                  value={this.state.liveAutocomplete}
                />
              }
              label="Enable Live Autocomplete"
            />
            <FormControlLabel
              control={
                <Switch
                  name="hightlightActiveLine"
                  checked={this.state.hightlightActiveLine}
                  onChange={(e) => this.handleChange(e)}
                  value={this.state.hightlightActiveLine}
                />
              }
              label="Hightlight Active Line"
            />
            <FormControlLabel
              control={
                <Switch
                  name="showLineNumber"
                  checked={this.state.showLineNumber}
                  onChange={(e) => this.handleChange(e)}
                  value={this.state.showLineNumber}
                />
              }
              label="Show Line #"
            />
          </FormGroup>
        </Center>
      </Wrap>
    );
  }
}

export default SettingsPage;
