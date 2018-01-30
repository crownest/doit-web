// Packages
import React from "react";

// Actions
import {
  alertify,
  HTTP_200_OK,
  HTTP_400_BAD_REQUEST
} from "../../actions/baseActions";
import { changeUserPassword } from "../../actions/userActions";

// Styles
import './index.css'


export default class ChangePasswordForm extends React.Component {
  constructor() {
    super();
    this.state = {
      old_password: "",
      new_password: "",
      confirm_new_password: "",
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
      old_password: "",
      new_password: "",
      confirm_new_password: "",
      errors: {}
    });
  }

  onSubmit = (e) => {
    e.preventDefault();
    var data = {
      old_password: this.state.old_password,
      new_password: this.state.new_password,
      confirm_new_password: this.state.confirm_new_password
    }

    changeUserPassword(data, (response) => {
      if (response) {
        if (response.statusCode === HTTP_200_OK) {
          this.onReset();
          alertify.success("Your password has been successfully changed.");
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
    const { old_password, new_password, confirm_new_password, errors} = this.state;

    return (
      <form id="id_change_password_form" onSubmit={this.onSubmit} onReset={this.onReset}>
        <div className="row">
          <div className="col-xs-12">
            <input
              type="password" id="id_old_password"
              name="old_password" placeholder="Old Password"
              value={old_password} onChange={this.onChange} />
            {errors.old_password &&
              <div className="input-feedback">
                {errors.old_password.map((error, index) =>
                  <span key={index}>{error}</span>
                )}
              </div>
            }
          </div>
          <div className="col-xs-12">
            <input
              type="password" id="id_new_password"
              name="new_password" placeholder="New Password"
              value={new_password} onChange={this.onChange} />
            {errors.new_password &&
              <div className="input-feedback">
                {errors.new_password.map((error, index) =>
                  <span key={index}>{error}</span>
                )}
              </div>
            }
          </div>
          <div className="col-xs-12">
            <input
              type="password" id="id_confirm_new_password"
              name="confirm_new_password" placeholder="Confirm New Password"
              value={confirm_new_password} onChange={this.onChange} />
            {errors.confirm_new_password &&
              <div className="input-feedback">
                {errors.confirm_new_password.map((error, index) =>
                  <span key={index}>{error}</span>
                )}
              </div>
            }
          </div>
          <div className="col-xs-12 change-password-button">
            <button type="submit">SEND</button>
          </div>
        </div>
      </form>
    );
  }
}
