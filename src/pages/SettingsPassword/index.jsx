// Packages
import React from 'react';
import { Redirect } from 'react-router-dom';

// Components
import Loader from '../../components/Loader/index';
import UserImage from '../../components/UserImage/index';
import ChangePasswordForm from '../../components/ChangePasswordForm/index'

// Objects
import Header from '../../objects/Header/index';

// Actions
import {
  alertify,
  HTTP_200_OK,
  isAuthentication
} from "../../actions/baseActions";
import { retrieveUser } from "../../actions/userActions";

// Styles
import './index.css';


export default class SettingsPassword extends React.Component {
  constructor() {
    super();

    this.state = {
      user: {},
      isLoading: true
    };

    this.setUser = this.setUser.bind(this);
  }

  componentWillMount() {
    document.title = "Change Password | Doit";

    if (isAuthentication()) {
      retrieveUser((response) => {
        if (response) {
          if (response.statusCode === HTTP_200_OK) {
            this.setUser(response.body);
          } else {
            alertify.error("An unexpected error has occurred and try again later.");
          }
        } else {
          alertify.error("An unexpected error has occurred and try again later.");
        }

        this.setState({ isLoading: false });
      });
    }
  }

  setUser = (user) => {
    this.setState({
      user: user
    });
  }

  render() {
    const { user, isLoading } = this.state;

    if (!isAuthentication()) {
      return (
        <Redirect to="/login/"/>
      )
    } else if (isLoading) {
      return (
        <div className="container settingspassword-page">
          <Header></Header>
          <div className="settingspassword-table">
            <Loader></Loader>
          </div>
        </div>
      )
    } else {
      return(
        <div className="container settingspassword-page">
          <Header></Header>
          <UserImage image_src={user.image_128x128}></UserImage>
          <div className="settingspassword-table">
            <div className="settingspassword-table__header">
              <p className="user-name">{user.first_name} {user.last_name}</p>
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
