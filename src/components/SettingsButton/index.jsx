// Packages
import React from 'react';
import { Link } from 'react-router-dom';
import SimpleLineIcon from 'react-simple-line-icons';

// Local Moduless
import './index.css';


export default class SettingsButton extends React.Component {
  render() {
    return(
      <a href="/settings/">
        <SimpleLineIcon name="settings"/>
      </a>
    );
  }
}
