// Packages
import React from "react";
import SimpleLineIcon from 'react-simple-line-icons';

// Actions
import {
  alertify,
  HTTP_200_OK,
  HTTP_400_BAD_REQUEST
} from "../../actions/baseActions";
import { updateTask } from "../../actions/taskActions";

// Styles
import './index.css'


export default class TaskUpdateForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: props.title,
      description: props.description,
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.setData = this.setData.bind(this);
    this.setErrors = this.setErrors.bind(this);
    this.onReset = this.onReset.bind(this);
  }

  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState(state);
  }

  setData = (data) => {
    this.setState({
      title: data.title,
      description: data.description
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
      title: "",
      description: "",
      errors: {}
    });
  }

  onSubmit = (e) => {
    e.preventDefault();
    var data = {
      title: this.state.title,
      description: this.state.description
    }

    updateTask(this.props.id, data, (response) => {
      if (response) {
        if (response.statusCode === HTTP_200_OK) {
          this.onReset();
          alertify.success("Task updated.");
          this.setData(response.body);
        } else if (response.statusCode === HTTP_400_BAD_REQUEST) {
          alertify.error("Please correct the errors and try again.");
          this.setErrors(response.body);
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
    const { title, description, errors } = this.state;

    return (
      <form id="id_task_update_form" onSubmit={this.onSubmit} onReset={this.onReset}>
        <div className="row">
          <div className="col-xs-12">
            <input
              type="text" id="id_title"
              name="title" placeholder="Title"
              value={title} onChange={this.onChange} />
            <button type="submit" className="task-update-button">
              <SimpleLineIcon name="check" color="green" size="large"/>
            </button>
            {errors.title &&
              <div className="input-feedback">
                {errors.title.map((error, index) =>
                  <span key={index}>{error}</span>
                )}
              </div>
            }
          </div>
          <div className="col-xs-12">
            <textarea
              id="id_description" name="description" placeholder="Description"
              value={description} onChange={this.onChange}>
            </textarea>
            {errors.description &&
              <div className="input-feedback">
                {errors.description.map((error, index) =>
                  <span key={index}>{error}</span>
                )}
              </div>
            }
          </div>
        </div>
      </form>
    );
  }
}
