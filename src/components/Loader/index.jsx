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
          color={'#36d7b7'}
          loading={this.props.isLoading}
        />
      </div>
    );
  }
}
