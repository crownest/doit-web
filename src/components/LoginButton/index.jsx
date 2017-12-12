// Packages
import React from 'react';
import { Link } from 'react-router-dom';

// Local Modules
import './index.css';


export default class LoginButton extends React.Component {
  render() {
    return(
      <Link to="/login/">
        <button className="login-button">Sign in</button>
      </Link>
    );
  }
}
