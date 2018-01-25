// Packages
import React from 'react';
import { Redirect } from 'react-router-dom';
import { Scrollbars } from 'react-custom-scrollbars';

// Components
import UserImage from '../../components/UserImage/index';
import TaskCreateButton from '../../components/TaskCreateButton/index';

// Objects
import Header from '../../objects/Header/index';
import TaskListContent from '../../objects/TaskListContent/index';
import TaskListEmptyContent from '../../objects/TaskListEmptyContent/index';

// Actions
import {
  alertify,
  HTTP_200_OK,
  isAuthentication
} from "../../actions/baseActions";
import { retrieveUser } from "../../actions/userActions";
import { listTask } from "../../actions/taskActions";

// Local Modules
import './index.css';


export default class TaskList extends React.Component {
  constructor() {
    super();

    this.state = {
      user: {},
      tasks: []
    };

    this.setTasks = this.setTasks.bind(this);
    this.setUser = this.setUser.bind(this);
  }

  componentWillMount() {
    document.title = "Tasks | Doit";

    if (isAuthentication()) {
      listTask((response) => {
        if (response) {
          if (response.statusCode === HTTP_200_OK) {
            this.setTasks(response.body);
          } else {
            alertify.error("An unexpected error has occurred and try again later.");
          }
        } else {
          alertify.error("An unexpected error has occurred and try again later.");
        }
      });

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

  setTasks = (tasks) => {
    this.setState({
      tasks: tasks
    });
  }

  setUser = (user) => {
    this.setState({
      user: user
    });
  }

  render() {
    const { user, tasks } = this.state;

    if (!isAuthentication()) {
      return (
        <Redirect to="/login/"/>
      )
    } else {
      let tasklist_content = null;

      if (tasks.length > 0) {
        tasklist_content = <TaskListContent tasks={tasks}></TaskListContent>;
      } else {
        tasklist_content = <TaskListEmptyContent></TaskListEmptyContent>;
      }

      return(
        <div className="container tasklist-page">
          <Header></Header>
          <UserImage image_src={user.image_128x128}></UserImage>
          <div className="tasklist-table">
            <div className="tasklist-table__header">
              <p className="user-name">{user.first_name} {user.last_name}</p>
              <TaskCreateButton></TaskCreateButton>
            </div>
            <div className="tasklist-table__content">
              <Scrollbars style={{height: 320}}
                          thumbSize={150}
                          renderThumbVertical={props => < div {...props} className="thumb-vertical"/>}
                          renderTrackVertical={props => < div {...props} className="track-vertical"/>}>
                {tasklist_content}
              </Scrollbars>
            </div>
          </div>
        </div>
      );
    }
  }
}
