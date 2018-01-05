// Packages
import React from "react";

// Local Modules
import { createContact } from "../../actions/coreActions";
import './index.css'


export default class SettingsContactForm extends React.Component {
  constructor(props) {
    super(props);

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

  componentWillReceiveProps(nextProps) {
    this.setState({
      email: nextProps.email,
      first_name: nextProps.first_name,
      last_name: nextProps.last_name
    });
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
      message: ""
    });
  }

  render() {
    const { message } = this.state;

    return (
      <form id="settings-contact-form" onSubmit={this.onSubmit} onReset={this.onReset}>
        <div className="row">
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
