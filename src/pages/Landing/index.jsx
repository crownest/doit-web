// Packages
import React from 'react';
import { Redirect } from 'react-router-dom';
import { ScrollContainer, ScrollSection } from 'react-onepage-scroll';
import SimpleLineIcon from 'react-simple-line-icons';

// Components
import Logo from '../../components/Logo/index';
import ContactForm from '../../components/ContactForm/index';

// Actions
import { isAuthentication } from "../../actions/baseActions";

// Local Modules
import './index.css';


export default class Landing extends React.Component {
  render() {
    if (isAuthentication()) {
      return (
        <Redirect to="/tasks/"/>
      )
    } else {
      return(
        <ScrollContainer>
          <ScrollSection pageId={0}>
            <div className="landing-page">
              <div className="slogan section">
                <div className="landing-header">
                  <div className="row">
                    <div className="col-xs-6">
                      <Logo url="/"></Logo>
                    </div>
                    <div className="col-xs-6">
                      <div className="links">
                        <a href="/register/" className="register-link">Register</a>
                        <a href="/login/" className="login-link">Login</a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-4 col-md-4 col-sm-6 col-xs-12">
                    <div className="slogan-text">
                      <h3>If you forget,<br/>we will remember.</h3>
                      <div className="line"></div>
                      <p>Doit is a reminder application. The purpose of this application to remind your works which you planed.</p>
                    </div>
                    <div className="application-icon">
                      <a href="#">
                        <img src="/images/playstore-icon.png"/>
                      </a>
                      <a href="#">
                        <img src="/images/applestore-icon.png"/>
                      </a>
                    </div>
                  </div>
                  <div className="col-lg-8 col-md-8 col-sm-6 col-xs-12">
                    <img className="device-splash" src="/images/device-splash.png"/>
                  </div>
                </div>
              </div>
            </div>
          </ScrollSection>

          <ScrollSection pageId={1}>
            <div className="features section">
              <div className="row">
                <div className="col-xs-12 hidden-sm hidden-md hidden-lg">
                  <div className="task-text">
                    <h3>Simple, stylish, useful interface and unobtrusive colors.</h3>
                    <div className="line"></div>
                    <p>You're going to have to think about it everywhere, as our mothers say. You are looking for what you need and you can not find it. I think you're crazy.</p>
                    <p>But we also think that we designed everything on a regular. You can add it to the list what you want to do.</p>
                    <p>We thought of you in design. We think you will use it often that we do not want your eyes to get tired. We used good colors for your eyes.</p>
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-6 hidden-xs">
                  <div className="features-left">
                    <figure className="device-task-detail">
                      <img src="/images/device-task-list-rotated.png"/>
                    </figure>
                    <div className="task-detail-text">
                      <h3>We searched for colors<br/>that good for your eyes.</h3>
                      <div className="line"></div>
                      <p>We thought of you in design. We think you will use it often that we do not want your eyes to get tired. We used good colors for your eyes.</p>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-6 hidden-xs">
                  <div className="features-right">
                    <div className="task-list-text">
                      <h3>
                        Simple, stylish and<br/>
                        <span>
                          useful interface.
                          <div className="specific-point"></div>
                        </span>
                      </h3>
                      <div className="line"></div>
                      <p>You're going to have to think about it everywhere, as our mothers say. You are looking for what you need and you can not find it. I think you're crazy.</p>
                      <p>But we also think that we designed everything on a regular. You can add it to the list what you want to do.</p>
                    </div>
                    <figure className="device-task-list">
                      <img src="/images/device-task-detail.png"/>
                    </figure>
                  </div>
                </div>
              </div>
            </div>
          </ScrollSection>

          <ScrollSection pageId={2}>
            <div className="form-contact section">
              <div className="row">
                <div className="col-xs-12">
                  <div className="location-icon">
                    <i className="material-icons">my_location</i>
                  </div>

                  <h3>Contact with us</h3>
                </div>
              </div>

              <ContactForm></ContactForm>

              <div className="row">
                <div className="col-xs-12">
                  <div className="landing-footer">
                    <p>DOIT <span>is a</span> Crownest <span>product.</span></p>
                    <p className="landing-footer-date">
                      2017 <i className="material-icons landing-footer-copyright">copyright</i>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </ScrollSection>
        </ScrollContainer>
      );
    }
  }
}
