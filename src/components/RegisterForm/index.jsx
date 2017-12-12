// Packages
import React from "react";

// Actions
import { createUser } from "../../actions/userActions";


export default class RegisterForm extends React.Component {
  constructor() {
    super();
    this.state = {
      email: "",
      first_name: "",
      last_name: "",
      password: "",
      confirm_password: ""
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
    createUser(this.state);
  }

  onReset = (e) => {
    this.setState({
      email: "",
      first_name: "",
      last_name: "",
      password: "",
      confirm_password: ""
    });
  }

  render() {
    const { email, first_name, last_name, password, confirm_password } = this.state;

    return (
      <form id="id_register_form" onSubmit={this.onSubmit} onReset={this.onReset}>
        <div className="row input-group">
          <div className="col-xs-12">
            <input 
              type="email" id="id_email"
              name="email" placeholder="Email"
              value={email} onChange={this.onChange} />
            <div id="email_feedback" className="input-feedback"></div>
          </div>
          <div className="col-xs-6">
            <input
              type="text" id="id_first_name"
              name="first_name" placeholder="First Name"
              value={first_name} onChange={this.onChange} />
            <div id="first_name_feedback" className="input-feedback"></div>
          </div>
          <div className="col-xs-6">
            <input
              type="text" id="id_last_name"
              name="last_name" placeholder="Last Name"
              value={last_name} onChange={this.onChange} />
            <div id="last_name_feedback" className="input-feedback"></div>
          </div>
          <div className="col-xs-12">
            <input
              type="password" id="id_password"
              name="password" placeholder="Password"
              value={password} onChange={this.onChange} />
            <div id="password_feedback" className="input-feedback"></div>
          </div>
          <div className="col-xs-12">
            <input
              type="password" id="id_confirm_password"
              name="confirm_password" placeholder="Confirm Pasword"
              value={confirm_password} onChange={this.onChange} />
            <div id="confirm_password_feedback" className="input-feedback"></div>
          </div>
          <div className="col-xs-12">
            <button type="submit" className="registerButton">Sign up</button>
          </div>
        </div>
      </form>
    );
  }
}
