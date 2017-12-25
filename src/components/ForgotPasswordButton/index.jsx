// Packages
import React from 'react';
import { Link } from 'react-router-dom';

// Local Modules
import './index.css';

var styles = {
  main: {
    color: '#4a4a4a',
    ':hover': {
      color: '#4a4a4a',
      outline: 'transparent'
    }
  }
};

export default class ForgotPasswordButton extends React.Component {
  render() {
    return(
      <Link to="/forgot/password/" style={styles.main} className="forgot-password-button">Forgot Password?</Link>
    );
  }
}
