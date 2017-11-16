// Packages
import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'

// Local Modules
import Register from './pages/register/index.js';
import './index.css';


const Home = () => (
  <div>
    <h2>Doit</h2>
    <a href='/register/'>Register</a>
  </div>
)


const AppRouter = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={Home}/>
      <Route exact path="/register/" component={Register}/>
    </Switch>
  </Router>
)


export default AppRouter;
