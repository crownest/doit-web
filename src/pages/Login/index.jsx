// Packages
import React from 'react';
import { Redirect } from 'react-router-dom';

// Components
import Logo from '../../components/Logo/index';
import LoginForm from '../../components/LoginForm/index';

// Local Modules
import { isAuthentication } from "../../actions/baseActions";
import './index.css';


export default class Login extends React.Component {
  render() {
    if (isAuthentication()) {
      return (
        <Redirect to="/tasks/"/>
      )
    } else {
      return(
        <div className="container login-page">
          <div className="row">
            <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 login-page__left">
              <div className="login-page__text">
                <Logo url="/"></Logo>
                <h1>Welcome</h1>
                <p className="titleText">Sign in continue</p>

                <LoginForm></LoginForm>

                <p className="accountText">Don't you have an account yet. <a href="/register/"><span>Sign up</span></a></p>
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 login-page__right">
              <div className="login-page__images">
                <img src="/images/device-splash.png" alt="device-splash" />
                <p className="icon-text">Download our mobile app</p>
                <div className="store-icon">
                  <a href="#">
                    <img className="applestore" src="/images/applestore-icon.png" alt="applestore-icon" />
                  </a>
                  <a href="#">
                    <img className="playstore" src="/images/playstore-icon.png" alt="playstore-icon" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}
