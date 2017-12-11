// Packages
import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

// Pages
import Landing from './pages/Landing/index';
import Register from './pages/Register/index';
import Login from './pages/Login/index';
import Logout from './pages/Logout/index';
import TaskList from './pages/TaskList/index';
import Settings from './pages/Settings/index';
import SettingsPassword from './pages/SettingsPassword/index';

// Local Modules
import './index.css';


const Generic404 = () => (
  <div>
    <h2>Doit</h2>
    <h3>404 Not Found!</h3>
  </div>
)


const AppRouter = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={Landing} />
      <Route path="/register/" component={Register} />
      <Route path="/login/" component={Login} />
      <Route path="/logout/" component={Logout} />
      <Route path="/tasks/" component={TaskList} />
      <Switch>
        <Route exact path="/settings/" component={Settings} />
        <Route path="/settings/password/" component={SettingsPassword} />
        <Route exact path='*' component={Generic404} />
      </Switch>
      <Route exact path='*' component={Generic404} />
    </Switch>
  </Router>
)


export default AppRouter;
