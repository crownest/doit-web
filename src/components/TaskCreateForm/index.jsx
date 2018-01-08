// Packages
import React from "react";
import SimpleLineIcon from 'react-simple-line-icons';

// Local Modules
import { createTask } from "../../actions/taskActions";
import './index.css'


export default class TaskCreateForm extends React.Component {
  constructor() {
    super();

    this.state = {
      title: "",
      description: ""
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
    createTask(this.state);
  }

  onReset = (e) => {
    this.setState({
      title: "",
      description: ""
    });
  }

  render() {
    const { title, description } = this.state;

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
            <div id="title_feedback" className="input-feedback"></div>
          </div>
          <div className="col-xs-12">
            <textarea
              id="id_description" name="description" placeholder="Description"
              value={description} onChange={this.onChange}>
            </textarea>
            <div id="description_feedback" className="input-feedback"></div>
          </div>
        </div>
      </form>
    );
  }
}
