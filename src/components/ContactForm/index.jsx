// Packages
import React from "react";

// Actions
import {
  alertify,
  HTTP_201_CREATED,
  HTTP_400_BAD_REQUEST
} from "../../actions/baseActions";
import { createContact } from "../../actions/coreActions";


export default class ContactForm extends React.Component {
  constructor() {
    super();
    this.state = {
      first_name: "",
      last_name: "",
      email: "",
      message: "",
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
      first_name: "",
      last_name: "",
      email: "",
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
    };

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
    const { first_name, last_name, email, message, errors } = this.state;

    return (
      <form id="id_contact_form" onSubmit={this.onSubmit} onReset={this.onReset}>
        <div className="row input-group">
          <div className="col-sm-6 col-xs-12">
            <p className="firstname-text">First Name</p>
            <input 
              type="text" id="id_first_name"
              className="first_name" name="first_name" 
              value={first_name} onChange={this.onChange} />
            {errors.first_name &&
              <div className="input-feedback">
                {errors.first_name.map((error, index) =>
                  <span key={index}>{error}</span>
                )}
              </div>
            }
          </div>
          <div className="col-sm-6 col-xs-12">
            <p className="lastname-text">Last Name</p>
            <input
              type="text" id="id_last_name"
              className="last_name" name="last_name"
              value={last_name} onChange={this.onChange} />
            {errors.last_name &&
              <div className="input-feedback">
                {errors.last_name.map((error, index) =>
                  <span key={index}>{error}</span>
                )}
              </div>
            }
          </div>
          <div className="col-lg-12 col-sm-8 col-xs-12">
            <p className="email-text">Email</p>
            <input 
              type="email" id="id_email"
              className="email" name="email"
              value={email} onChange={this.onChange} />
            {errors.email &&
              <div className="input-feedback">
                {errors.email.map((error, index) =>
                  <span key={index}>{error}</span>
                )}
              </div>
            }
          </div>
          <div className="col-sm-6 col-xs-12">
            <div className="message-box">
              <p className="message-text">Message</p>
              <textarea
                id="id_message" className="message" name="message"
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
          </div>
          <div className="col-sm-2 col-xs-12">
            <button className="landingButton">SEND</button>
          </div>
        </div>
      </form>
    );
  }
}
