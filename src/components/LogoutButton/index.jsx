// Packages
import React from 'react';
import { Link } from 'react-router-dom';
import SimpleLineIcon from 'react-simple-line-icons';

// Local Modules
import './index.css';


export default class LogoutButton extends React.Component {
  render() {
    return(
      <Link to="/logout/">
        <SimpleLineIcon name="logout"/>
      </Link>
    );
  }
}
