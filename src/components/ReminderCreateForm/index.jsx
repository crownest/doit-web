// Packages
import React from "react";
import Moment from 'moment';
import Datetime from 'react-datetime';
import SimpleLineIcon from 'react-simple-line-icons';

// Actions
import { createReminder } from '../../actions/reminderActions'

// Local Modules
import './index.css'
import '../../../node_modules/react-datetime/css/react-datetime.css'

export default class ReminderCreateForm extends React.Component {
  constructor() {
    super();

    this.state = {
      task: "",
      date: null
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
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

  onSubmit = (e) => {
    e.preventDefault();
    createReminder(this.state);
  }

  onReset = (e) => {
    this.setState({
      task: "",
      date: null
    });
  }

  render() {
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
            <div id="date_feedback" className="input-feedback"></div>
          </div>
        </div>
      </form>
    );
  }
}
