// Packages
import React from "react";

// Local Modules
import { createContact } from "../../actions/coreActions";


export default class ContactForm extends React.Component {
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
      <form id="id_contact_form" onSubmit={this.onSubmit} onReset={this.onReset}>
        <div className="row input-group">
          <div className="col-xs-4">
            <p>First Name</p>
            <input 
              type="text" id="id_first_name"
              className="first_name" name="first_name" 
              value={first_name} onChange={this.onChange} />
            <div id="first_name_feedback" className="input-feedback"></div>
          </div>
          <div className="col-xs-4">
            <p>Last Name</p>
            <input
              type="text" id="id_last_name"
              className="last_name" name="last_name"
              value={last_name} onChange={this.onChange} />
            <div id="last_name_feedback" className="input-feedback"></div>
          </div>
          <div className="col-xs-8">
            <p>Email</p>
            <input 
              type="email" id="id_email"
              className="email" name="email"
              value={email} onChange={this.onChange} />
            <div id="email_feedback" className="input-feedback"></div>
          </div>
          <div className="col-xs-6">
            <div className="message-box">
              <p>Message</p>
              <textarea
                id="id_message" className="message" name="message"
                value={message} onChange={this.onChange}>
              </textarea>
              <div id="message_feedback" className="input-feedback"></div>
            </div>
          </div>
          <div className="col-xs-2">
            <button className="landingButton">SEND</button>
          </div>
        </div>
      </form>
    );
  }
}
