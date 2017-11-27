// Packages 
import React from 'react';
import { Redirect } from 'react-router-dom'

// Local Packages
import { removeToken } from "../../actions/baseActions";


export default class Logout extends React.Component {
  componentDidMount(){
    removeToken();
  }

  render() {
    return (
      <Redirect to="/"/>
    );
  }
}
