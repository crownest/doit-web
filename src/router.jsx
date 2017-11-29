// Packages
import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom'

// Pages
import Landing from './pages/Landing/index';
import Register from './pages/Register/index';
import Login from './pages/Login/index';
import Logout from './pages/Logout/index';
import TaskList from './pages/TaskList/index';

// Local Modules
import { isAuthentication } from "./actions/baseActions";
import './index.css';


const Index = () => (
  isAuthentication() ? (
    <div>
      <h2>Doit</h2>
      <a href='/logout/'>Logout</a> <br/>
    </div>
  ) : (
    <Redirect to="/login/"/>
  )
)


const Generic404 = () => (
  <div>
    <h2>Doit</h2>
    <h3>404 Not Found!</h3>
  </div>
)


const AppRouter = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={Landing}/>
      <Route path="/register/" component={Register}/>
      <Route path="/login/" component={Login}/>
      <Route path="/logout/" component={Logout}/>
      <Route path="/index/" component={Index}/>
      <Route path="/tasklist/" component={TaskList}/>
      <Route exact path='*' component={Generic404} />
    </Switch>
  </Router>
)


export default AppRouter;
