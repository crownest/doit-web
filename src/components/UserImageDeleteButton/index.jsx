// Packages
import React from 'react';

// Actions
import {
  alertify,
  HTTP_204_NO_CONTENT
} from "../../actions/baseActions";
import { deleteUserImage } from "../../actions/userActions";

// Local Modules
import "./index.css"


export default class UserImageDeleteButton extends React.Component {

  onDelete(user_id) {
    alertify.confirm("Are you sure you want to delete?", function () {
      deleteUserImage(user_id, (response) => {
        if (response) {
          if (response.statusCode === HTTP_204_NO_CONTENT) {
            alertify.success("Image deleted.");
            window.location.reload();
          } else {
            alertify.error("An unexpected error has occurred and try again later.");
          }
        } else {
          alertify.error("An unexpected error has occurred and try again later.");
        }
      });
    });
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
