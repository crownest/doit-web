// Packages
import React from "react";

// Actions
import {
  alertify,
  HTTP_201_CREATED,
  HTTP_400_BAD_REQUEST
} from "../../actions/baseActions";
import { createContact } from "../../actions/coreActions";

// Styles
import './index.css'


export default class SettingsContactForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      first_name: props.first_name,
      last_name: props.last_name,
      email: props.email,
      message: props.message,
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.setErrors = this.setErrors.bind(this);
    this.onReset = this.onReset.bind(this);
  }

  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState(state);
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
      message: "",
      errors: {}
    });
  }

  onSubmit = (e) => {
    e.preventDefault();
    var data = {
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      email: this.state.email,
      message: this.state.message
    }

    createContact(data, (response) => {
      if (response) {
        if (response.statusCode === HTTP_201_CREATED) {
          this.onReset();
          alertify.success("Your message was successfully sent.");
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
    const { message, errors } = this.state;

    return (
      <form id="settings-contact-form" onSubmit={this.onSubmit} onReset={this.onReset}>
        <div className="row">
          <div className="col-xs-12">
            <textarea
              id="id_message" className="message"
              name="message" placeholder="Message"
              value={message} onChange={this.onChange}>
            </textarea>
            {errors.message &&
              <div className="input-feedback">
                {errors.message.map((error, index) =>
                  <span key={index}>{error}</span>
                )}
              </div>
            }
          </div>
          <div className="col-xs-12 settings-contact-button">
            <button type="submit">SEND</button>
          </div>
        </div>
      </form>
    );
  }
}
