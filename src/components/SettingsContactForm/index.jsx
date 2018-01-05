// Packages
import React from "react";

// Local Modules
import { createContact } from "../../actions/coreActions";
import './index.css'


export default class SettingsContactForm extends React.Component {
  constructor() {
    super();
    this.state = {
      first_name: "",
      last_name: "",
      email: "",
      message: ""
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onReset = this.onReset.bind(this);
  }

  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState(state);
  }

  onSubmit = (e) => {
    e.preventDefault();
    createContact(this.state);
  }

  onReset = (e) => {
    this.setState({
      first_name: "",
      last_name: "",
      email: "",
      message: ""
    });
  }

  render() {
    const { first_name, last_name, email, message } = this.state;

    return (
      <form id="settings-contact-form" onSubmit={this.onSubmit} onReset={this.onReset}>
        <div className="row">
          <div className="col-xs-12">
            <input
              type="email" id="email"
              name="email" placeholder="Email"
              value={email} onChange={this.onChange} />
            <div id="email_feedback" className="input-feedback"></div>
          </div>
          <div className="col-xs-12">
            <input
              type="text" id="first_name"
              name="first_name" placeholder="First Name"
              value={first_name} onChange={this.onChange} />
            <div id="first_name_feedback" className="input-feedback"></div>
          </div>
          <div className="col-xs-12">
            <input
              type="text" id="last_name"
              name="last_name" placeholder="Last Name"
              value={last_name} onChange={this.onChange} />
            <div id="last_name_feedback" className="input-feedback"></div>
          </div>
          <div className="col-xs-12">
            <textarea
              id="id_message" className="message"
              name="message" placeholder="Message"
              value={message} onChange={this.onChange}>
            </textarea>
            <div id="message_feedback" className="input-feedback"></div>
          </div>
          <div className="col-xs-12 settings-contact-button">
            <button type="submit">SEND</button>
          </div>
        </div>
      </form>
    );
  }
}
