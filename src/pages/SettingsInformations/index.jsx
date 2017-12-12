// Packages
import React from 'react';
import { Link, Redirect } from 'react-router-dom';

// Components
import UserImage from '../../components/UserImage/index';
import ChangeInformationsForm from '../../components/ChangeInformationsForm/index'

// Objects
import Header from '../../objects/Header/index';

// Local Modules
import { isAuthentication } from "../../actions/baseActions";
import { retrieveUser } from "../../actions/userActions";
import './index.css';


export default class SettingsInformations extends React.Component {
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
      return (
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
                      <p className="header-title">INFORMATIONS</p>
                    </div>
                  </div>
                </div>
                <div className="settings-table__content">
                  <ChangeInformationsForm
                    email={this.state.user.email}
                    first_name={this.state.user.first_name}
                    last_name={this.state.user.last_name}>
                  </ChangeInformationsForm>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}
