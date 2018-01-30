// Packages
import React from 'react';
import SimpleLineIcon from 'react-simple-line-icons';

// Actions
import {
  alertify,
  HTTP_204_NO_CONTENT
} from "../../actions/baseActions";
import { deleteReminder } from "../../actions/reminderActions";

// Styles
import "./index.css"


export default class ReminderDeleteButton extends React.Component {

  onDelete(reminder_id) {
    alertify.confirm("Are you sure you want to delete?", function () {
      deleteReminder(reminder_id, (response) => {
        if (response) {
          if (response.statusCode === HTTP_204_NO_CONTENT) {
            alertify.success("Reminder deleted.");
            window.location.reload();
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
      <div className="reminder-delete-button">
        <SimpleLineIcon name="close" size="large" onClick={() => this.onDelete(this.props.reminder.id)} />
      </div>
    );
  }
}
