// Packages
import React from 'react';
import { Link } from 'react-router-dom';

// Local Modules
import './index.css';


export default class ForgotPassword extends React.Component {
  render() {
    return(
      <Link to="/forgot/password/" className="forgot-password-button">Forgot Password?</Link>
    );
  }
}
