// Packages
import React from "react";
import Moment from 'moment';

// Styles
import './index.css'


export default class ReminderRetrieveContent extends React.Component {
  render() {

    return (
      <div className="row reminder-retrieve-content">
        <div className="col-xs-12">
          {this.props.locale_date ?
            <p>{Moment(this.props.locale_date).format('DD.MM.YYYY HH:mm')}</p> :
            <p>{Moment(this.props.date).format('DD.MM.YYYY HH:mmZ')}</p>
          }
        </div>
      </div>
    );
  }
}
