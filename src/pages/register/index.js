// Packages
import React from 'react';

// Local Modules
import RegisterForm from '../../components/RegisterForm/index';
import './index.css';


export default class Register extends React.Component {
  render() {
    return(
      <div className="container register-page">
        <div className="row">
          <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 register-page__left">
            <div className="register-page__text">
              <a href="/">
                <img className="logo" src="/images/logo.png" alt="logo"/>
              </a>
              <h1>Sign Up Now</h1>
              <p className="titleText">You can register by filling out the form.</p>

              <RegisterForm></RegisterForm>

              <p className="accountText">If you have an account <a href="#"><span>Sign In</span></a></p>
            </div>
          </div>
          <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 register-page__right">
            <div className="register-page__images">
              <img src="/images/device-task-list.png" alt="device-task-list" />
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
