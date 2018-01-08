// Packages
import React from 'react';
import { Redirect } from 'react-router-dom';

// Components
import ChangeImageForm from '../../components/ChangeImageForm/index';
import UserImageDeleteButton from '../../components/UserImageDeleteButton/index';

// Objects
import Header from '../../objects/Header/index';

// Actions
import { isAuthentication } from "../../actions/baseActions";
import { retrieveUser } from "../../actions/userActions";

// Local Modules
import './index.css';


export default class SettingsImage extends React.Component {
  constructor() {
    super();

    this.state = {
      user: {}
    };
  }

  componentWillMount() {
    document.title = "Change Image | Doit";

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
        <div className="container settingsimage-page">
          <Header></Header>
          <div className="settingsimage-table">
            <div className="settingsimage-table__header">
              <p className="user-name">{this.state.user.first_name} {this.state.user.last_name}</p>
            </div>
            <div className="settingsimage-table__content">
              <ChangeImageForm user={this.state.user}></ChangeImageForm>
              <UserImageDeleteButton user={this.state.user}></UserImageDeleteButton>
            </div>
          </div>
        </div>
      );
    }
  }
}
