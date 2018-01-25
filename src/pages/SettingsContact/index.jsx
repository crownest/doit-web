// Packages
import React from 'react';
import { Redirect } from 'react-router-dom';

// Components
import UserImage from '../../components/UserImage/index';
import SettingsContactForm from '../../components/SettingsContactForm/index';

// Objects
import Header from '../../objects/Header/index';

// Local Modules
import {
  alertify,
  HTTP_200_OK,
  isAuthentication
} from "../../actions/baseActions";
import { retrieveUser } from "../../actions/userActions";
import './index.css';


export default class SettingsContact extends React.Component {
  constructor() {
    super();

    this.state = {
      user: {}
    };

    this.setUser = this.setUser.bind(this);
  }

  componentWillMount() {
    document.title = "Contact | Doit";

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
      });
    }
  }

  setUser = (user) => {
    this.setState({
      user: user
    });
  }

  render() {
    const { user } = this.state;

    if (!isAuthentication()) {
      return (
        <Redirect to="/login/"/>
      )
    } else {
      return (
        <div className="container settingscontact-page">
          <Header></Header>
          <UserImage image_src={user.image_128x128}></UserImage>
          <div className="settingscontact-table">
            <div className="settingscontact-table__header">
              <p className="header-title">CONTACT</p>
            </div>
            <div className="settingscontact-table__content">
              <SettingsContactForm
                email={user.email}
                first_name={user.first_name}
                last_name={user.last_name}
              ></SettingsContactForm>
            </div>
          </div>
        </div>
      );
    }
  }
}
