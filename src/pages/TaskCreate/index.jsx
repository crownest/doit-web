// Packages
import React from 'react';
import { Redirect } from 'react-router-dom';

// Components
import UserImage from '../../components/UserImage/index';
import TaskCreateForm from '../../components/TaskCreateForm/index'

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


export default class TaskCreate extends React.Component {
  constructor() {
    super();

    this.state = {
      user: {}
    };

    this.setUser = this.setUser.bind(this);
  }

  componentWillMount() {
    document.title = "Task Create | Doit";

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
        <div className="container taskcreate-page">
          <Header></Header>
          <UserImage image_src={user.image_128x128}></UserImage>
          <div className="taskcreate-table">
            <div className="taskcreate-table__header">
              <p className="user-name">{user.first_name} {user.last_name}</p>
            </div>
            <div className="taskcreate-table__content">
              <TaskCreateForm></TaskCreateForm>
            </div>
          </div>
        </div>
      );
    }
  }
}
