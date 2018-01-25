// Packages
import React from "react";
import { Redirect } from 'react-router-dom';

// Components
import ForgotPasswordButton from '../ForgotPasswordButton/index'

// Actions
import {
  alertify,
  HTTP_200_OK,
  HTTP_400_BAD_REQUEST,
  setAuthInformations
} from "../../actions/baseActions";
import { authLogin } from "../../actions/coreActions";

// Local Modules
import './index.css'


export default class LoginForm extends React.Component {
  constructor() {
    super();
    this.state = {
      redirect: false,
      email: "",
      password: "",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.setError = this.setError.bind(this);
    this.setRedirect = this.setRedirect.bind(this);
    this.onReset = this.onReset.bind(this);
  }

  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState(state);
  }

  onSubmit = (e) => {
    e.preventDefault();
    var data = {
      email: this.state.email,
      password: this.state.password
    };

    authLogin(data, (response) => {
      if (response) {
        if (response.statusCode === HTTP_200_OK) {
          this.onReset();
          setAuthInformations(response.body.auth_token, response.body.user_id);
          this.setRedirect();
        } else if (response.statusCode === HTTP_400_BAD_REQUEST) {
          this.setError(response.body);
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

  setError = (errors) => {
    this.setState({
      errors: errors
    });

    if (errors.non_field_errors) {
      alertify.error(errors.non_field_errors.join("<br>"));
    }
  }

  setRedirect = (e) => {
    this.setState({
      redirect: true
    });
  }

  onReset = (e) => {
    this.setState({
      redirect: false,
      email: "",
      password: "",
      errors: {}
    });
  }

  render() {
    const { redirect, email, password, errors } = this.state;

    if (redirect) {
      return <Redirect to='/tasks/'/>;
    }

    return (
      <form id="id_login_form" onSubmit={this.onSubmit} onReset={this.onReset}>
        <div className="row input-group">
          <div className="col-xs-12">
            <input 
              type="email" id="id_email"
              name="email" placeholder="Email"
              value={email} onChange={this.onChange} />
            {errors.email &&
              <div className="input-feedback">
                {errors.email.map((error, index) =>
                  <span key={index}>{error}</span>
                )}
              </div>
            }
          </div>
          <div className="col-xs-12">
            <input
              type="password" id="id_password"
              name="password" placeholder="Password"
              value={password} onChange={this.onChange} />
            {errors.password &&
              <div className="input-feedback">
                {errors.password.map((error, index) =>
                  <span key={index}>{error}</span>
                )}
              </div>
            }
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
