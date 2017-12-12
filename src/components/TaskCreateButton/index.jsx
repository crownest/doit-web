import React from 'react';
import {Link} from 'react-router-dom';
import SimpleLineIcon from 'react-simple-line-icons';

// Local Modules
import './index.css';


export default class TaskCreateButton extends React.Component {
  render() {
    return(
      <div className="add-task">
        <p>Add Task</p>
        <Link to="/task/create/">
          <SimpleLineIcon name="plus"/>
        </Link>
      </div>
    );
  }
}
