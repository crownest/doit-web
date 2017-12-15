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
import { isAuthentication } from "../../actions/baseActions";
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
  }

  componentWillMount() {
    if (isAuthentication()) {
      listTask((body) => {
        this.setState({
          tasks: body
        });
      });

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
      let tasklist_content = null;

      if (this.state.tasks.length > 0) {
        tasklist_content = <TaskListContent tasks={this.state.tasks}></TaskListContent>;
      } else {
        tasklist_content = <TaskListEmptyContent></TaskListEmptyContent>;
      }

      return(
        <div className="container tasklist-page">
          <Header></Header>
          <UserImage image_src={this.state.user.image_128x128}></UserImage>
          <div className="tasklist-table">
            <div className="tasklist-table__header">
              <p className="user-name">{this.state.user.first_name} {this.state.user.last_name}</p>
              <TaskCreateButton></TaskCreateButton>
            </div>
            <div className="tasklist-table__content">
              <Scrollbars style={{height: 290}}
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
