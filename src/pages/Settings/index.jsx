// Packages
import React from 'react';
import { Link, Redirect } from 'react-router-dom';

// Components
import Loader from '../../components/Loader/index';
import UserImage from '../../components/UserImage/index';

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


export default class Settings extends React.Component {
  constructor() {
    super();

    this.state = {
      user: {},
      isLoading: true
    };

    this.setUser = this.setUser.bind(this);
  }

  componentWillMount() {
    document.title = "Settings | Doit";

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
        <div className="container settings-page">
          <Header></Header>
          <div className="settings-table">
            <Loader></Loader>
          </div>
        </div>
      )
    } else {
      return(
        <div className="container settings-page">
          <Header></Header>
          <UserImage image_src={user.image_128x128}></UserImage>
          <div className="settings-table">
            <div className="settings-table__header">
              <p className="user-name">{user.first_name} {user.last_name}</p>
              <p className="header-title">SETTINGS</p>
            </div>
            <div className="settings-table__content">
              <div className="row">
                <div className="col-xs-12">
                  <div className="link-div">
                    <Link className="link" to="/settings/informations/">Change Informations</Link>
                  </div>
                </div>
                <div className="col-xs-12">
                  <div className="link-div">
                    <Link className="link" to="/settings/password/">Change Password</Link>
                  </div>
                </div>
                <div className="col-xs-12">
                  <div className="link-div">
                    <Link className="link" to="/settings/image/">Change Image</Link>
                  </div>
                </div>
                <div className="col-xs-12">
                  <div className="link-div">
                    <Link className="link" to="/settings/contact/">Contact</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}
