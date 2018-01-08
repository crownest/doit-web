// Packages
import React from "react";
import Moment from 'moment';
import Datetime from 'react-datetime';
import SimpleLineIcon from 'react-simple-line-icons';

// Actions
import { updateReminder } from '../../actions/reminderActions'

// Local Modules
import './index.css'
import '../../../node_modules/react-datetime/css/react-datetime.css'


export default class ReminderUpdateForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      date: null,
      locale_date: props.locale_date
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onReset = this.onReset.bind(this);
  }

  onChange = (e) => {
    this.setState({
      date: Moment(e).format("YYYY-MM-DDTHH:mmZ")
    });
  }

  onSubmit = (e) => {
    e.preventDefault();
    updateReminder(this.props.id, this.state, (body) => {
      this.setState({
        date: body.locale_date,
        locale_date: body.locale_date
      });
    });
  }

  onReset = (e) => {
    this.setState({
      date: null
    });
  }

  render() {
    const { locale_date } = this.state;

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
            <div id="date_feedback" className="input-feedback"></div>
          </div>
        </div>
      </form>
    );
  }
}
