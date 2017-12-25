// Packages
import React from "react";

// Actions
import { forgotUserPassword } from "../../actions/userActions";

// Local Modules
import './index.css'


export default class ForgotPasswordForm extends React.Component {
  constructor() {
    super();
    this.state = {
      email: ""
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
    forgotUserPassword(this.state);
  }

  onReset = (e) => {
    this.setState({
      email: ""
    });
  }

  render() {
    const { email } = this.state;

    return (
      <form id="id_forgot_password_form" onSubmit={this.onSubmit} onReset={this.onReset}>
        <div className="row">
          <div className="col-xs-12">
            <input
              type="email" id="id_email"
              name="email" placeholder="Email"
              value={email} onChange={this.onChange} />
            <div id="email_feedback" className="input-feedback"></div>
          </div>
          <div className="col-xs-12 forgot-password-button">
            <button type="submit">SEND</button>
          </div>
        </div>
      </form>
    );
  }
}
