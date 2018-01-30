// Packages
import React from 'react';

// Components
import Logo from '../../components/Logo/index';

// Styles
import './index.css';


export default class Generic404 extends React.Component {
  componentWillMount() {
    document.title = "404 | Doit";
  }

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
