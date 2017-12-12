// Packages
import React from 'react';
import { Link } from 'react-router-dom';

// Local Modules
import './index.css';


export default class Logo extends React.Component {
  render() {
    return(
      <div>
        <Link to={this.props.url}>
          <img className="logo" src="/images/logo.png" alt="logo"/>
        </Link>
      </div>
    );
  }
}
