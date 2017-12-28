// Packages
import React from 'react';
import SimpleLineIcon from 'react-simple-line-icons';

// Actions
import { deleteTask } from "../../actions/taskActions";

// Local Modules
import "./index.css"


export default class TaskDeleteButton extends React.Component {

  onDelete(task_id) {
    deleteTask(task_id);
  }

  render() {
    return(
      <div className="task-delete-button">
        <SimpleLineIcon name="close" onClick={() => this.onDelete(this.props.task.id)} />
      </div>
    );
  }
}
