// Packages
import React from "react";

// Actions
import { changePassword } from "../../actions/userActions";

// Local Modules
import './index.css'


export default class ChangePasswordForm extends React.Component {
  constructor() {
    super();
    this.state = {
      old_password: "",
      new_password: "",
      confirm_new_password: ""
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
    changePassword(this.state);
  }

  onReset = (e) => {
    this.setState({
      old_password: "",
      new_password: "",
      confirm_new_password: ""
    });
  }

  render() {
    const { old_password, new_password, confirm_new_password } = this.state;

    return (
      <form id="id_change_password_form" onSubmit={this.onSubmit} onReset={this.onReset}>
        <div className="row">
          <div className="col-xs-12">
            <input
              type="password" id="id_old_password"
              name="old_password" placeholder="Old Password"
              value={old_password} onChange={this.onChange} />
            <div id="old_password_feedback" className="input-feedback"></div>
          </div>
          <div className="col-xs-12">
            <input
              type="password" id="id_new_password"
              name="new_password" placeholder="New Password"
              value={new_password} onChange={this.onChange} />
            <div id="new_password_feedback" className="input-feedback"></div>
          </div>
          <div className="col-xs-12">
            <input
              type="password" id="id_confirm_new_password"
              name="confirm_new_password" placeholder="Confirm New Password"
              value={confirm_new_password} onChange={this.onChange} />
            <div id="confirm_new_password_feedback" className="input-feedback"></div>
          </div>
          <div className="col-xs-12 change-password-button">
            <button type="submit">SEND</button>
          </div>
        </div>
      </form>
    );
  }
}
