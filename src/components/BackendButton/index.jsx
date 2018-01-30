// Packages
import React from 'react';
import SimpleLineIcon from 'react-simple-line-icons';

// Actions
import { url } from '../../actions/baseActions' 

// Styles
import './index.css';


export default class BackendButton extends React.Component {
  render() {
    return(
      <a href={url} target="_blank" className="notebook-button">
        <SimpleLineIcon name="notebook"/>
      </a>
    );
  }
}
