import React from 'react';
import './index.css';

export default class Register extends React.Component {
  render() {
    return(
      <div className="container register-page">
        <div className="row">
          <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 register-page__left">
            <div className="register-page__text">
              <img className="logo" src="/images/logo.png" alt="logo"/>
              <h1>Sign Up Now</h1>
              <p className="titleText">You can register by filling out the form.</p>

              <div className="row input-group">
                <div className="col-xs-12">
                  <input type="email" placeholder="Email"/>
                </div>
             
                <div className="col-xs-6">
                  <input type="text" placeholder="First Name"/>
                </div>
                <div className="col-xs-6">
                  <input type="text" placeholder="Last Name"/>
                </div>

                <div className="col-xs-12">
                  <input type="password" placeholder="Password"/>
                </div>
             
                <div className="col-xs-12">
                  <input type="password" placeholder="Confirm Pasword"/>
                </div>
            
                <div className="col-xs-12">
                  <button className="signButton">Sign Up</button>
                </div>    
              </div>

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
