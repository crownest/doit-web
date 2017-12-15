import React from 'react';
import { Link } from 'react-router-dom';

// Local Modules
import './index.css';


export default class TaskCreateButton extends React.Component {
  render() {
    return(
      <div className="add-task">
        <Link to="/tasks/create/">
          <img src="/images/add-btn.png" className="add-btn" alt="Add Task" />
        </Link>
      </div>
    );
  }
}
