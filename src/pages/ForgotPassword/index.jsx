// Packages
import React from 'react';
import { Redirect } from 'react-router-dom';

// Components
import ForgotPasswordForm from '../../components/ForgotPasswordForm/index'

// Objects
import Header from '../../objects/Header/index';

// Actions
import { isAuthentication } from "../../actions/baseActions";

// Local Modules
import './index.css';


export default class ForgotPassword extends React.Component {
  render() {
    if (isAuthentication()) {
      return (
        <Redirect to="/tasks/"/>
      )
    } else {
      return(
        <div className="container forgot-password-page">
          <Header></Header>
          <div className="forgot-password-table">
            <div className="row">
              <div className="col-xs-12">
                <div className="forgot-password-table__header">
                  <div className="row">
                    <div className="col-xs-12">
                      <p className="header-title">FORGOT PASSWORD</p>
                    </div>
                  </div>
                </div>
                <div className="forgot-password-table__content">
                  <ForgotPasswordForm></ForgotPasswordForm>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}
