// Packages 
import React from 'react';
import { Redirect } from 'react-router-dom';

// Local Packages
import { removeAuthInformations } from "../../actions/baseActions";


export default class Logout extends React.Component {
  componentDidMount(){
    removeAuthInformations();
  }

  render() {
    return (
      <Redirect to="/"/>
    );
  }
}
