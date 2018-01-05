// Packages
import React from 'react';

// Components
import Logo from '../../components/Logo/index';

// Local Modules
import './index.css';


export default class Generic404 extends React.Component {
  render() {
    return (
      <div className="generic404-page">
        <Logo url="/"></Logo>
        <div className="generic404-page__content">
          <p>Oppss!</p>
          <p>Page Not Found</p>
        </div>
      </div>
    );
  }
}
