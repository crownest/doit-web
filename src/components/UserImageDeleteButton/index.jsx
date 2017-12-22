// Packages
import React from 'react';
import SimpleLineIcon from 'react-simple-line-icons';

// Actions
import { deleteUserImage } from "../../actions/userActions";

// Local Modules
import "./index.css"


export default class UserImageDeleteButton extends React.Component {

  onDelete(user_id) {
    deleteUserImage(user_id);
  }

  render() {
    return(
      <button
        name="close" className="delete-image-button"
        onClick={() => this.onDelete(this.props.user.id)}>
        DELETE
      </button>
    );
  }
}
