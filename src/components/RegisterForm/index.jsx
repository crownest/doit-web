// Packages
import React from "react";
import { Redirect } from 'react-router-dom';

// Actions
import {
  alertify,
  HTTP_201_CREATED,
  HTTP_400_BAD_REQUEST
} from "../../actions/baseActions";
import { createUser } from "../../actions/userActions";


export default class RegisterForm extends React.Component {
  constructor() {
    super();
    this.state = {
      redirect: false,
      email: "",
      first_name: "",
      last_name: "",
      password: "",
      confirm_password: "",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.setErrors = this.setErrors.bind(this);
    this.setRedirect = this.setRedirect.bind(this);
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

  setRedirect = (e) => {
    this.setState({
      redirect: true
    });
  }

  onReset = (e) => {
    this.setState({
      email: "",
      first_name: "",
      last_name: "",
      password: "",
      confirm_password: "",
      errors: {}
    });
  }

  onSubmit = (e) => {
    e.preventDefault();
    var data = {
      email: this.state.email,
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      password: this.state.password,
      confirm_password: this.state.confirm_password
    };

    createUser(data, (response) => {
      if (response) {
        if (response.statusCode === HTTP_201_CREATED) {
          this.onReset();
          alertify.success(
            "Your registration was successful.<br> Please verify your email address."
          );
          this.setRedirect();
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
    const { redirect, email, first_name, last_name, password, confirm_password, errors } = this.state;

    if (redirect) {
      return (
        <Redirect to='/login/'/>
      )
    }

    return (
      <form id="id_register_form" onSubmit={this.onSubmit} onReset={this.onReset}>
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
          <div className="col-xs-6">
            <input
              type="text" id="id_first_name"
              name="first_name" placeholder="First Name"
              value={first_name} onChange={this.onChange} />
            {errors.first_name &&
              <div className="input-feedback">
                {errors.first_name.map((error, index) =>
                  <span key={index}>{error}</span>
                )}
              </div>
            }
          </div>
          <div className="col-xs-6">
            <input
              type="text" id="id_last_name"
              name="last_name" placeholder="Last Name"
              value={last_name} onChange={this.onChange} />
            {errors.last_name &&
              <div className="input-feedback">
                {errors.last_name.map((error, index) =>
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
            <input
              type="password" id="id_confirm_password"
              name="confirm_password" placeholder="Confirm Pasword"
              value={confirm_password} onChange={this.onChange} />
            {errors.confirm_password &&
              <div className="input-feedback">
                {errors.confirm_password.map((error, index) =>
                  <span key={index}>{error}</span>
                )}
              </div>
            }
          </div>
          <div className="col-xs-12">
            <button type="submit" className="registerButton">Sign up</button>
          </div>
        </div>
      </form>
    );
  }
}
