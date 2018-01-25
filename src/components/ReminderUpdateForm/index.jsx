// Packages
import React from "react";
import Moment from 'moment';
import Datetime from 'react-datetime';
import SimpleLineIcon from 'react-simple-line-icons';

// Actions
import {
  alertify,
  HTTP_200_OK,
  HTTP_400_BAD_REQUEST
} from "../../actions/baseActions";
import { updateReminder } from '../../actions/reminderActions'

// Local Modules
import './index.css'
import '../../../node_modules/react-datetime/css/react-datetime.css'


export default class ReminderUpdateForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      date: null,
      locale_date: props.locale_date,
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.setData = this.setData.bind(this);
    this.setErrors = this.setErrors.bind(this);
    this.onReset = this.onReset.bind(this);
  }

  onChange = (e) => {
    this.setState({
      date: Moment(e).format("YYYY-MM-DDTHH:mmZ")
    });
  }

  setData = (data) => {
    this.setState({
      date: data.locale_date,
      locale_date: data.locale_date
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
      date: null,
      errors: {}
    });
  }

  onSubmit = (e) => {
    e.preventDefault();
    var data = {
      date: this.state.date
    };

    updateReminder(this.props.id, data, (response) => {
      if (response) {
        if (response.statusCode === HTTP_200_OK) {
          this.onReset();
          alertify.success("Reminder updated.");
          this.setData(response.body);
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
    const { locale_date, errors } = this.state;

    return (
      <form id="reminder-update-form" onSubmit={this.onSubmit} onReset={this.onReset}>
        <div className="row">
          <div className="col-xs-12">
            {locale_date ?
              <p>{Moment(locale_date).format('DD.MM.YYYY HH:mm')}</p> :
              <p>{Moment(this.props.date).format('DD.MM.YYYY HH:mmZ')}</p>
            }
            <Datetime className="reminder-datetime" dateFormat="DD.MM.YYYY" timeFormat="HH:mm"
              inputProps={{ name: "date", className: "reminder-datetime-input", placeholder: 'N/A'}}
              onChange={this.onChange} />
            <button type="submit" className="reminder-update-button">
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
