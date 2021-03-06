// Packages
import React from 'react';
import { Link } from 'react-router-dom';
import SimpleLineIcon from 'react-simple-line-icons';

// Styles
import './index.css';


export default class LogoutButton extends React.Component {
  render() {
    return(
      <Link to="/logout/" className="logout-button">
        <SimpleLineIcon name="logout"/>
      </Link>
    );
  }
}
