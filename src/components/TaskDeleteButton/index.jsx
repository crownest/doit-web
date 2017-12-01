// Packages
import React from 'react';
import SimpleLineIcon from 'react-simple-line-icons';

// Local Modules
import { deleteTask } from "../../actions/taskActions";


export default class TaskDeleteButton extends React.Component {

  onDelete(task_id) {
    deleteTask(task_id);
  }

  render() {
    return(
      <SimpleLineIcon name="close" onClick={() => this.onDelete(this.props.task.id)} />
    );
  }
}
