// Packages
import React from 'react';
import { Link } from 'react-router-dom';

// Components
import TaskDeleteButton from '../../components/TaskDeleteButton/index'

// Local Moduless
import './index.css';


export default class TaskListContent extends React.Component {
  render() {
    return(
      <div>
        {this.props.tasks.map(task =>
          <div key={task.id} className={"task-info " + (task.status + '-task')}>
            <div className="task-content-link">
              <Link to={"/tasks/" + (task.id + '/')}>{task.title}</Link>
            </div>
            <TaskDeleteButton task={task}></TaskDeleteButton>
          </div>
        )}
      </div>
    );
  }
}
