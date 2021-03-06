// Packages
import React from 'react';

// Components
import UserImage from '../UserImage/index';
import Loader from '../../components/Loader/index';

// Actions
import {
  alertify,
  HTTP_200_OK,
  HTTP_400_BAD_REQUEST
} from "../../actions/baseActions";
import { updateUserImage } from '../../actions/userActions';

// Styles
import './index.css';


export default class ChangeImageForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      image: null,
      image_src: props.user.image,
      errors: {},
      isLoading: false
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onReset = this.onReset.bind(this);
  }

  onChange = (e) => {
    this.setState({
      image: e.target.files[0],
    });

    let reader = new FileReader();
    reader.onload = (e) => {
        this.setState({
          image_src: e.target.result
        });
    };
    reader.readAsDataURL(e.target.files[0]);
  }

  setErrors = (errors) => {
    this.setState({
      errors: errors
    });

    if (errors.non_field_errors) {
      alertify.error(errors.non_field_errors.join("<br>"));
    }
  }

  onReset = (e) => {
    this.setState({
      image: null,
      errors: {},
      isLoading: false
    });
  }

  onSubmit = (e) => {
    e.preventDefault();
    var image = this.state.image;
    this.setState({ isLoading: true });

    updateUserImage(image, (response) => {
      if (response) {
        if (response.statusCode === HTTP_200_OK) {
          this.onReset();
          alertify.success("Your image has been successfully updated.");
        } else if (response.statusCode === HTTP_400_BAD_REQUEST) {
          this.setErrors(response.body);
          alertify.error("Please correct the errors and try again.");
        } else {
          this.onReset();
          alertify.error("An unexpected error has occurred and try again later.");
        }
      } else {
        this.onReset();
        alertify.error("An unexpected error has occurred and try again later.");
      }

      this.setState({ isLoading: false });
    });
  }

  render() {
    const { image_src, errors, isLoading } = this.state;

    return(
      <form id="change-image-form" onSubmit={this.onSubmit} onReset={this.onReset}>
        <div className="change-image">
          <UserImage image_src={image_src}></UserImage>
          <div className="overlay">
            <label htmlFor="id-image" className="change-image-label">
              <img src="/images/change-photo.png" alt="change"/>
            </label>
            <input type="file" id="id-image" name="image" onChange={this.onChange.bind(this)} />
          </div>
        </div>
        {errors.image &&
          <div className="input-feedback">
            {errors.image.map((error, index) =>
              <span key={index}>{error}</span>
            )}
          </div>
        }
        {isLoading ?
          <button type="submit" className="change-image-button" disabled>
            <Loader></Loader>
          </button> :
          <button type="submit" className="change-image-button">CHANGE</button>
        }
      </form>
    );
  }
}
