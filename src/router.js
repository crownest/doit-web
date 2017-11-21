// Packages
import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom'

// Pages
import Register from './pages/Register/index.js';
import Login from './pages/Login/index.js';
import Logout from './pages/Logout/index.js';

// Local Modules
import { isAuthentication } from "./actions/baseActions";
import './index.css';


const Home = () => (
  isAuthentication() ? (
    <Redirect to="/index/"/>
  ) : (
    <div>
      <h2>Doit</h2>
      <a href='/login/'>Login</a> <br/>
      <a href='/register/'>Register</a>
    </div>
  )
)

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
      <Route exact path="/" component={Home}/>
      <Route path="/register/" component={Register}/>
      <Route path="/login/" component={Login}/>
      <Route path="/logout/" component={Logout}/>
      <Route path="/index/" component={Index}/>
      <Route exact path='*' component={Generic404} />
    </Switch>
  </Router>
)


export default AppRouter;
