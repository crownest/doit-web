// Packages
import React from 'react';

// Styles
import './index.css';


export default class UserImage extends React.Component {
  render() {
    return(
      <div className="user">
        <figure className="user-photo">
          <img src={this.props.image_src} alt=""/>
        </figure>
      </div>
    );
  }
}
