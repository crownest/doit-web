// Packages
import React from 'react';
import { Link, Redirect } from 'react-router-dom';

// Components
import UserImage from '../../components/UserImage/index';
import ChangePasswordForm from '../../components/ChangePasswordForm/index'

// Objects
import Header from '../../objects/Header/index';

// Actions
import { isAuthentication } from "../../actions/baseActions";
import { retrieveUser } from "../../actions/userActions";

// Local Modules
import './index.css';


export default class SettingsPassword extends React.Component {
  constructor() {
    super();

    this.state = {
      user: {}
    };
  }

  componentWillMount() {
    if (isAuthentication()) {
      retrieveUser((body) => {
        this.setState({
          user: body
        });
      });
    }
  }

  render() {
    if (!isAuthentication()) {
      return (
        <Redirect to="/login/"/>
      )
    } else {
      return(
        <div className="container settings-password-page">
          <Header></Header>
          <UserImage image_src={this.state.user.image_128x128}></UserImage>
          <div className="settings-table">
            <div className="row">
              <div className="col-xs-12">
                <div className="settings-table__header">
                  <div className="row">
                    <div className="col-xs-12">
                      <p className="user-name">{this.state.user.first_name} {this.state.user.last_name}</p>
                      <p className="header-title">PASSWORD</p>
                    </div>
                  </div>
                </div>
                <div className="settings-table__content">
                  <ChangePasswordForm></ChangePasswordForm>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}
