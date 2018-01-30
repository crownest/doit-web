// Packages
import React from "react";
import { Redirect } from 'react-router-dom';
import SimpleLineIcon from 'react-simple-line-icons';

// Actions
import {
  alertify,
  HTTP_201_CREATED,
  HTTP_400_BAD_REQUEST
} from "../../actions/baseActions";
import { createTask } from "../../actions/taskActions";

// Styles
import './index.css'


export default class TaskCreateForm extends React.Component {
  constructor() {
    super();

    this.state = {
      redirect: false,
      id: null,
      title: "",
      description: "",
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

  setRedirect = (id) => {
    this.setState({
      redirect: true,
      id: id
    });
  }

  onReset = (e) => {
    this.setState({
      redirect: false,
      id: null,
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

    createTask(data, (response) => {
      if (response) {
        if (response.statusCode === HTTP_201_CREATED) {
          this.onReset();
          alertify.success("Task created.");
          this.setRedirect(response.body.id);
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
    const { redirect, id, title, description, errors } = this.state;

    if (redirect && id) {
      return <Redirect to={"/tasks/" + id + "/"}/>;
    }

    return (
      <form id="id_task_create_form" onSubmit={this.onSubmit} onReset={this.onReset}>
        <div className="row">
          <div className="col-xs-12">
            <input
              type="text" id="id_title"
              name="title" placeholder="Title"
              value={title} onChange={this.onChange} />
            <button type="submit" className="task-create-button">
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
