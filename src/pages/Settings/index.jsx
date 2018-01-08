// Packages
import React from 'react';
import { Link, Redirect } from 'react-router-dom';

// Components
import UserImage from '../../components/UserImage/index';

// Objects
import Header from '../../objects/Header/index';

// Actions
import { isAuthentication } from "../../actions/baseActions";
import { retrieveUser } from "../../actions/userActions";

// Local Modules
import './index.css';


export default class Settings extends React.Component {
  constructor() {
    super();

    this.state = {
      user: {}
    };
  }

  componentWillMount() {
    document.title = "Settings | Doit";

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
        <div className="container settings-page">
          <Header></Header>
          <UserImage image_src={this.state.user.image_128x128}></UserImage>
          <div className="settings-table">
            <div className="settings-table__header">
              <p className="user-name">{this.state.user.first_name} {this.state.user.last_name}</p>
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
