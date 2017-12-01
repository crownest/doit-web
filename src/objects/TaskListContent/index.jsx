// Packages
import React from 'react';

// Components
import TaskDeleteButton from '../../components/TaskDeleteButton/index'

// Local Moduless
import './index.css';


export default class TaskListContent extends React.Component {
  render() {
    return(
      <div>
        {this.props.tasks.map(task =>
          <div key={task.id} className="task-info">
            <p>{task.title}</p>
            <TaskDeleteButton task={task}></TaskDeleteButton>
          </div>
        )}
      </div>
    );
  }
}
