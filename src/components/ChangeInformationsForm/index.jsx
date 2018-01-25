// Packages
import React from "react";

// Actions
import {
  alertify,
  HTTP_200_OK,
  HTTP_400_BAD_REQUEST
} from "../../actions/baseActions";
import { updateUser } from "../../actions/userActions";

// Local Modules
import './index.css'


export default class ChangeInformationsForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      first_name: "",
      last_name: "",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.setData = this.setData.bind(this);
    this.setErrors = this.setErrors.bind(this);
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

  setData = (data) => {
    this.setState({
      email: data.email,
      first_name: data.first_name,
      last_name: data.last_name
    });
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
      email: "",
      first_name: "",
      last_name: "",
      errors: {}
    });
  }

  onSubmit = (e) => {
    e.preventDefault();
    updateUser(this.state, (response) => {
      if (response) {
        if (response.statusCode === HTTP_200_OK) {
          this.onReset();
          alertify.success("Your informations has been successfully updated.");
          this.setData(response.body);
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
    const { email, first_name, last_name, errors } = this.state;

    return (
      <form id="id_change_informations_form" onSubmit={this.onSubmit} onReset={this.onReset}>
        <div className="row">
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
          <div className="col-xs-12">
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
          <div className="col-xs-12 change-informations-button">
            <button type="submit">SEND</button>
          </div>
        </div>
      </form>
    );
  }
}
