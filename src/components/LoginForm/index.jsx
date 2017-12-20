// Packages
import React from "react";

// Components
import ForgotPasswordButton from '../ForgotPasswordButton/index'

// Actions
import { authLogin } from "../../actions/coreActions";

// Local Modules
import './index.css'


export default class RegisterForm extends React.Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: ""
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
    authLogin(this.state);
  }

  onReset = (e) => {
    this.setState({
      email: "",
      password: ""
    });
  }

  render() {
    const { email, password } = this.state;

    return (
      <form id="id_login_form" onSubmit={this.onSubmit} onReset={this.onReset}>
        <div className="row input-group">
          <div className="col-xs-12">
            <input 
              type="email" id="id_email"
              name="email" placeholder="Email"
              value={email} onChange={this.onChange} />
            <div id="email_feedback" className="input-feedback"></div>
          </div>
          <div className="col-xs-12">
            <input
              type="password" id="id_password"
              name="password" placeholder="Password"
              value={password} onChange={this.onChange} />
            <div id="password_feedback" className="input-feedback"></div>
          </div>
          <div className="col-xs-12">
            <button type="submit" className="loginButton">Sign in</button>
            <ForgotPasswordButton></ForgotPasswordButton>
          </div>
        </div>
      </form>
    );
  }
}
