// Packages
import React from 'react';

// Components
import UserImage from '../UserImage/index';
import { updateUserImage } from '../../actions/userActions';

// Local Modules
import './index.css';


export default class ChangeImageForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      image: null
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onReset = this.onReset.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      image_src: nextProps.user.image
    });
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

  onSubmit = (e) => {
    e.preventDefault();
    updateUserImage(this.state);
  }

  onReset = (e) => {
    this.setState({
      image: ""
    });
  }

  render() {
    const { image, image_src } = this.state;

    return(
      <form id="change-image-form" onSubmit={this.onSubmit} onReset={this.onReset}>
        <div className="change-image">
          <UserImage image_src={image_src}></UserImage>
          <div className="overlay">
            <label htmlFor="id-image" className="change-image-label">
              <img src="/images/change-photo.png" alt="change-photo"/>
            </label>
            <input type="file" id="id-image" name="image" onChange={this.onChange.bind(this)} />
          </div>
        </div>
        <div id="image_feedback" className="input-feedback"></div>
        <button type="submit" className="change-image-button">CHANGE</button>
      </form>
    );
  }
}
