// Packages
import React from 'react';
import { Redirect } from 'react-router-dom';

// Components
import ChangeImageForm from '../../components/ChangeImageForm/index';
import UserImageDeleteButton from '../../components/UserImageDeleteButton/index';

// Objects
import Header from '../../objects/Header/index';

// Actions
import {
  alertify,
  HTTP_200_OK,
  isAuthentication
} from "../../actions/baseActions";
import { retrieveUser } from "../../actions/userActions";

// Local Modules
import './index.css';


export default class SettingsImage extends React.Component {
  constructor() {
    super();

    this.state = {
      user: {}
    };

    this.setUser = this.setUser.bind(this);
  }

  componentWillMount() {
    document.title = "Change Image | Doit";

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
      return(
        <div className="container settingsimage-page">
          <Header></Header>
          <div className="settingsimage-table">
            <div className="settingsimage-table__header">
              <p className="user-name">{user.first_name} {user.last_name}</p>
            </div>
            <div className="settingsimage-table__content">
              <ChangeImageForm user={user}></ChangeImageForm>
              <UserImageDeleteButton user={user}></UserImageDeleteButton>
            </div>
          </div>
        </div>
      );
    }
  }
}
