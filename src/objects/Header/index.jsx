// Packages
import React from 'react';

// Components
import Logo from '../../components/Logo/index';
import SettingsButton from '../../components/SettingsButton/index';
import LogoutButton from '../../components/LogoutButton/index';
import LoginButton from '../../components/LoginButton/index';

// Actions
import { isAuthentication } from "../../actions/baseActions";

// Local Modules
import './index.css';


export default class Header extends React.Component {
  render() {
    if (!isAuthentication()) {
      return(
        <div className="header">
          <div className="row">
            <div className="col-xs-6">
              <Logo url="/tasks/"></Logo>
            </div>
            <div className="col-xs-6">
              <div className="header-icons">
                <LoginButton></LoginButton>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return(
        <div className="header">
          <div className="row">
            <div className="col-xs-6">
              <Logo url="/tasks/"></Logo>
            </div>
            <div className="col-xs-6">
              <div className="header-icons">
                <SettingsButton></SettingsButton>
                <div className="line"></div>
                <LogoutButton></LogoutButton>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}
