// Packages
import React from 'react';
import { Redirect } from 'react-router-dom';

// Components
import Loader from '../../components/Loader/index';
import UserImage from '../../components/UserImage/index';
import SettingsContactForm from '../../components/SettingsContactForm/index';

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


export default class SettingsContact extends React.Component {
  constructor() {
    super();

    this.state = {
      user: {},
      isLoading: true
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
        <div className="container settingscontact-page">
          <Header></Header>
          <div className="settingscontact-table">
            <Loader></Loader>
          </div>
        </div>
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
