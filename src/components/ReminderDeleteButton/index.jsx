// Packages
import React from 'react';
import SimpleLineIcon from 'react-simple-line-icons';

// Actions
import { deleteReminder } from "../../actions/reminderActions";

// Local Modules
import "./index.css"


export default class ReminderDeleteButton extends React.Component {

  onDelete(task_id) {
    deleteReminder(task_id);
  }

  render() {
    return(
      <div className="reminder-delete-button">
        <SimpleLineIcon name="close" size="large" onClick={() => this.onDelete(this.props.reminder.id)} />
      </div>
    );
  }
}
