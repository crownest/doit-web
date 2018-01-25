// Packages
import React from "react";
import Moment from 'moment';
import Datetime from 'react-datetime';
import SimpleLineIcon from 'react-simple-line-icons';

// Actions
import {
  alertify,
  HTTP_201_CREATED,
  HTTP_400_BAD_REQUEST
} from "../../actions/baseActions";
import { createReminder } from '../../actions/reminderActions'

// Local Modules
import './index.css'
import '../../../node_modules/react-datetime/css/react-datetime.css'

export default class ReminderCreateForm extends React.Component {
  constructor() {
    super();

    this.state = {
      task: "",
      date: null,
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.setErrors = this.setErrors.bind(this);
    this.onReset = this.onReset.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      task: nextProps.task_id
    });
  }

  onChange = (e) => {
    this.setState({
      date: Moment(e).format("YYYY-MM-DDTHH:mmZ")
    });
  }

  setErrors = (errors) => {
    this.setState({
      errors: errors
    });

    if (errors.non_field_errors) {
      alertify.error(errors.non_field_errors.join("<br>"));
    }
  }

  onReset = (e) => {
    this.setState({
      task: "",
      date: null,
      errors: {}
    });
  }

  onSubmit = (e) => {
    e.preventDefault();
    var data = {
      task: this.state.task,
      date: this.state.date
    };

    createReminder(data, (response) => {
      if (response) {
        if (response.statusCode === HTTP_201_CREATED) {
          this.onReset();
          alertify.success("Reminder created.");
          window.location.reload();
        } else if (response.statusCode === HTTP_400_BAD_REQUEST) {
          this.setErrors(response.body);
          alertify.error("Please correct the errors and try again.");
        } else {
          this.onReset();
          alertify.error("An unexpected error has occurred and try again later.");
        }
      } else {
        this.onReset();
        alertify.error("An unexpected error has occurred and try again later.");
      }
    });
  }

  render() {
    const { errors } = this.state;

    return (
      <form id="reminder-create-form" onSubmit={this.onSubmit} onReset={this.onReset}>
        <div className="row">
          <div className="col-xs-12">
            <Datetime className="reminder-datetime" dateFormat="DD.MM.YYYY" timeFormat="HH:mm"
              inputProps={{ name: "date", className: "reminder-datetime-input", placeholder: 'N/A'}}
              onChange={this.onChange} />
            <button type="submit" className="reminder-create-button">
              <SimpleLineIcon name="check" color="green" size="large"/>
            </button>
            {errors.date &&
              <div className="input-feedback">
                {errors.date.map((error, index) =>
                  <span key={index}>{error}</span>
                )}
              </div>
            }
          </div>
        </div>
      </form>
    );
  }
}
