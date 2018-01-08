// Packages
import React from 'react';
import { Redirect } from 'react-router-dom';

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
        <div className="container settingspassword-page">
          <Header></Header>
          <UserImage image_src={this.state.user.image_128x128}></UserImage>
          <div className="settingspassword-table">
            <div className="settingspassword-table__header">
              <p className="user-name">{this.state.user.first_name} {this.state.user.last_name}</p>
              <p className="header-title">PASSWORD</p>
            </div>
            <div className="settingspassword-table__content">
              <ChangePasswordForm></ChangePasswordForm>
            </div>
          </div>
        </div>
      );
    }
  }
}
