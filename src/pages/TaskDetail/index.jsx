// Packages
import React from 'react';
import { Redirect } from 'react-router-dom';

// Components
import Loader from '../../components/Loader/index';
import UserImage from '../../components/UserImage/index';
import TaskUpdateForm from '../../components/TaskUpdateForm/index'
import ReminderCreateForm from '../../components/ReminderCreateForm/index'

// Objects
import Header from '../../objects/Header/index';
import ReminderListContent from '../../objects/ReminderListContent/index';

// Actions
import {
  alertify,
  HTTP_200_OK,
  isAuthentication
} from "../../actions/baseActions";
import { retrieveUser } from "../../actions/userActions";
import { retrieveTask } from "../../actions/taskActions";


// Styles
import './index.css';


export default class TaskDetail extends React.Component {
  constructor() {
    super();

    this.state = {
      redirect: false,
      user: {},
      task: {
        title: "",
        description: "",
        reminders: []
      },
      isLoading: true
    };

    this.setTask = this.setTask.bind(this);
    this.setUser = this.setUser.bind(this);
    this.setRedirect = this.setRedirect.bind(this);
  }

  componentWillMount() {
    document.title = "Task Detail | Doit";

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

      var task_id = this.props.match.params.task_id;
      retrieveTask(task_id, (response) => {
        if (response) {
          if (response.statusCode === HTTP_200_OK) {
            this.setTask(response.body);
          } else {
            alertify.error("An unexpected error has occurred and try again later.");
            this.setRedirect();
          }
        } else {
          alertify.error("An unexpected error has occurred and try again later.");
          this.setRedirect();
        }

        this.setState({ isLoading: false });
      });
    }
  }

  setTask = (task) => {
    this.setState({
      task: task
    });
  }

  setUser = (user) => {
    this.setState({
      user: user
    });
  }

  setRedirect = (e) => {
    this.setState({
      redirect: true
    });
  }

  render() {
    const { redirect, user, task, isLoading } = this.state;

    if (!isAuthentication()) {
      return (
        <Redirect to="/login/"/>
      )
    } else if (redirect) {
      return (
        <Redirect to="/tasks/"/>
      )
    } else if (isLoading) {
      return (
        <div className="container taskdetail-page">
          <Header></Header>
          <div className="taskdetail-table">
            <Loader></Loader>
          </div>
        </div>
      )
    } else {
      let reminder_content = null;

      if (task.reminders.length > 0) {
        reminder_content = <ReminderListContent reminders={task.reminders}></ReminderListContent>
      } else {
        reminder_content = <ReminderCreateForm task_id={task.id}></ReminderCreateForm>
      }

      return(
        <div className="container taskdetail-page">
          <Header></Header>
          <UserImage image_src={user.image_128x128}></UserImage>
          <div className="taskdetail-table">
            <div className="taskdetail-table__header">
              <p className="user-name">{user.first_name} {user.last_name}</p>
            </div>
            <div className="taskdetail-table__content">
              <TaskUpdateForm
                id={this.props.match.params.task_id}
                title={task.title}
                description={task.description}>
              </TaskUpdateForm>
              {reminder_content}
            </div>
          </div>
        </div>
      );
    }
  }
}
