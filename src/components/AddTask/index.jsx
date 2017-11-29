import React from 'react';
import {Link} from 'react-router-dom';

//Local Moduless
import SimpleLineIcon from 'react-simple-line-icons';
import './index.css';

export default class AddTask extends React.Component {
  render() {
    return(
      <div className="add-task">
        <p>Add Task</p>
        <Link to="">
          <SimpleLineIcon name="plus"/>
        </Link>
      </div>
    );
  }
}