// Packages
import React from 'react';
import { Redirect } from 'react-router-dom';

// Components
import UserImage from '../../components/UserImage/index';
import TaskUpdateForm from '../../components/TaskUpdateForm/index'
import ReminderCreateForm from '../../components/ReminderCreateForm/index'

// Objects
import Header from '../../objects/Header/index';
import ReminderListContent from '../../objects/ReminderListContent/index';

// Actions
import { isAuthentication } from "../../actions/baseActions";
import { retrieveUser } from "../../actions/userActions";
import { retrieveTask } from "../../actions/taskActions";


// Local Modules
import './index.css';


export default class TaskDetail extends React.Component {
  constructor() {
    super();

    this.state = {
      user: {},
      task: {
        title: "",
        description: "",
        reminders: []
      }
    };
  }

  componentWillMount() {
    if (isAuthentication()) {
      retrieveUser((body) => {
        this.setState({
          user: body
        });
      });

      var task_id = this.props.match.params.task_id;
      retrieveTask(task_id, (body) => {
        this.setState({
          task: body
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
      let reminder_content = null;

      if (this.state.task.reminders.length > 0) {
        reminder_content = <ReminderListContent reminders={this.state.task.reminders}></ReminderListContent>
      } else {
        reminder_content = <ReminderCreateForm task_id={this.state.task.id}></ReminderCreateForm>
      }

      return(
        <div className="container taskdetail-page">
          <Header></Header>
          <UserImage image_src={this.state.user.image_128x128}></UserImage>
          <div className="taskdetail-table">
            <div className="taskdetail-table__header">
              <p className="user-name">{this.state.user.first_name} {this.state.user.last_name}</p>
            </div>
            <div className="taskdetail-table__content">
              <TaskUpdateForm
                id={this.props.match.params.task_id}
                title={this.state.task.title}
                description={this.state.task.description}>
              </TaskUpdateForm>
              {reminder_content}
            </div>
          </div>
        </div>
      );
    }
  }
}
