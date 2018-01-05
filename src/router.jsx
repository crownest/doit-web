// Packages
import React from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Switch,
  Route
} from 'react-router-dom';

// Pages
import Landing from './pages/Landing/index';
import Register from './pages/Register/index';
import Login from './pages/Login/index';
import ForgotPassword from './pages/ForgotPassword/index';
import Logout from './pages/Logout/index';
import TaskList from './pages/TaskList/index';
import TaskCreate from './pages/TaskCreate/index';
import TaskDetail from './pages/TaskDetail/index';
import Settings from './pages/Settings/index';
import SettingsPassword from './pages/SettingsPassword/index';
import SettingsInformations from './pages/SettingsInformations/index';
import SettingsImage from './pages/SettingsImage/index';
import SettingsContact from './pages/SettingsContact/index';

// Local Modules
import './index.css';


const Generic404 = () => (
  <div>
    <h2>Doit</h2>
    <h3>404 Not Found!</h3>
  </div>
)


const LandingRedirect = () => (
  <Redirect to="/login/"/>
)


const AppRouter = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={LandingRedirect} />
      <Route exact path="/register/" component={Register} />
      <Route exact path="/login/" component={Login} />
      <Route exact path="/forgot/password/" component={ForgotPassword} />
      <Route exact path="/logout/" component={Logout} />
      <Route exact path="/tasks/" component={TaskList} />
      <Route exact path="/tasks/create/" component={TaskCreate} />
      <Route exact path="/tasks/:task_id/" component={TaskDetail} />
      <Route exact path="/settings/" component={Settings} />
      <Route exact path="/settings/password/" component={SettingsPassword} />
      <Route exact path="/settings/informations/" component={SettingsInformations} />
      <Route exact path="/settings/image/" component={SettingsImage} />
      <Route exact path="/settings/contact/" component={SettingsContact} />
      <Route exact path='*' component={Generic404} />
    </Switch>
  </Router>
)


export default AppRouter;
