// Packages
import React from "react";

// Local Modules
import { updateUser } from "../../actions/userActions";
import './index.css'


export default class ChangeInformationsForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      first_name: "",
      last_name: ""
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
    updateUser(this.state);
  }

  onReset = (e) => {
    this.setState({
      email: "",
      first_name: "",
      last_name: ""
    });
  }

  render() {
    const { email, first_name, last_name } = this.state;

    return (
      <form id="id_change_informations_form" onSubmit={this.onSubmit} onReset={this.onReset}>
        <div className="row">
          <div className="col-xs-12">
            <input
              type="email" id="id_email"
              name="email" placeholder="Email"
              value={email} onChange={this.onChange} />
            <div id="email_feedback" className="input-feedback"></div>
          </div>
          <div className="col-xs-12">
            <input
              type="text" id="id_first_name"
              name="first_name" placeholder="First Name"
              value={first_name} onChange={this.onChange} />
            <div id="first_name_feedback" className="input-feedback"></div>
          </div>
          <div className="col-xs-12">
            <input
              type="text" id="id_last_name"
              name="last_name" placeholder="Last Name"
              value={last_name} onChange={this.onChange} />
            <div id="last_name_feedback" className="input-feedback"></div>
          </div>
          <div className="col-xs-12 change-informations-button">
            <button type="submit">SEND</button>
          </div>
        </div>
      </form>
    );
  }
}
