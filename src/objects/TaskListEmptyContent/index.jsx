// Packages
import React from 'react';

// Local Moduless
import './index.css';


export default class TaskListEmptyContent extends React.Component {
  render() {
    return(
      <div className="empty_content">
        <img src="/images/school-material.png" alt="empty-task-list"/>
        <p>To Do List Empty</p>
      </div>
    );
  }
}
