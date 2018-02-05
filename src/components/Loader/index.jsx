// Packages
import React from 'react';
import { SyncLoader } from 'react-spinners';

// Styles
import './index.css';


export default class Loader extends React.Component {
  render() {
    return(
      <div className="loader">
        <SyncLoader
          color={'#9C00E2'}
          loading={this.props.isLoading}
        />
      </div>
    );
  }
}
