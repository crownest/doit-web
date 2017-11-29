import React from 'react';

//Components
import AddTask from '../../components/AddTask/index.jsx';

//Objects
import Header from '../../objects/Header/index.jsx';

//Local Moduless
import SimpleLineIcon from 'react-simple-line-icons';
import { Scrollbars } from 'react-custom-scrollbars';
import './index.css';

export default class TaskList extends React.Component {
  render() {
    return(
      <div className="container tasklist-page">
        <Header></Header>
        <div className="user">
          <figure className="user-photo">
            <img src="/images/default-photo.png" alt="default-photo"/>
          </figure>
        </div>
        <div className="tasklist-table">
          <div className="row">
            <div className="col-xs-12">
              <div className="tasklist-table__header">
                <div className="row">
                  <div className="col-xs-12">
                    <p className="user-name">Jackson Flowers</p>
                    <AddTask></AddTask>
                  </div>
                </div>
              </div>
              <div className="tasklist-table__content">
                <div className="row">
                  <div className="col-xs-12">
                    <Scrollbars style={{height: 200}}>
                      <div className="medicine">
                        <p>Medicine</p>
                        <SimpleLineIcon name="close"/>
                      </div>
                      <div className="homework">
                        <p>Homework</p>
                        <SimpleLineIcon name="close"/>
                      </div>
                      <div className="meeting">
                        <p>Meeting</p>
                        <SimpleLineIcon name="close"/>
                      </div>
                      <div className="medicine">
                        <p>Medicine</p>
                        <SimpleLineIcon name="close"/>
                      </div>
                      <div className="homework">
                        <p>Homework</p>
                        <SimpleLineIcon name="close"/>
                      </div>
                      <div className="meeting">
                        <p>Meeting</p>
                        <SimpleLineIcon name="close"/>
                      </div>
                    </Scrollbars>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}