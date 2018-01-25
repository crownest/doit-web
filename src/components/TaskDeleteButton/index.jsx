// Packages
import React from 'react';
import SimpleLineIcon from 'react-simple-line-icons';

// Actions
import {
  alertify,
  HTTP_204_NO_CONTENT
} from "../../actions/baseActions";
import { deleteTask } from "../../actions/taskActions";

// Local Modules
import "./index.css"


export default class TaskDeleteButton extends React.Component {
  onDelete(task_id) {
    alertify.confirm("Are you sure you want to delete?", function () {
      deleteTask(task_id, (response) => {
        if (response) {
          if (response.statusCode === HTTP_204_NO_CONTENT) {
            alertify.success("Task deleted.");
            window.location.reload()
          } else {
            alertify.error("An unexpected error has occurred and try again later.");
          }
        } else {
          alertify.error("An unexpected error has occurred and try again later.");
        }
      });
    });
  }

  render() {
    return(
      <div className="task-delete-button">
        <SimpleLineIcon name="close" onClick={() => this.onDelete(this.props.task.id)} />
      </div>
    );
  }
}
