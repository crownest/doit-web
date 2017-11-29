import React from 'react';
import {Link} from 'react-router-dom';

//Local Moduless
import SimpleLineIcon from 'react-simple-line-icons';
import './index.css';


export default class Header extends React.Component {
  render() {
    return(
      <div className="header">
      <div className="row">
        <div className="col-xs-6">
          <img className="logo" src="/images/logo.png" alt="logo"/>
        </div>
        <div className="col-xs-6">
          <div className="header-icons">
            <Link to="">
              <SimpleLineIcon name="settings"/>
            </Link>
            <div className="line"></div>
            <Link to="/logout/">
              <SimpleLineIcon name="logout"/>
            </Link>
          </div>
        </div>
      </div>
      </div>
    );
  }
}