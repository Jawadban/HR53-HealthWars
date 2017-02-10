//Client entry point
import React from 'react';
import { render } from 'react-dom';
import {Router, Route, IndexRoute, hashHistory, IndexRedirect} from 'react-router';
import App from './components/App';
import LoggingExercise from './components/exercise/LoggingExercise';
import UserView from './components/userView/UserView';
import Overview from './components/overview/Overview';
import Dashboard from './components/adminDashboard/Dashboard';
import Slack from './components/slack/Slack';
import MainLayout from './components/MainLayout';
import AuthLayout from './components/AuthLayout';
import Login from './components/auth/Login';
import Calendar from './components/calendar/Calendar';
import Logout from './components/auth/Logout';
import axios from 'axios';
  
function requireAuth() {
  console.log('PING!');
}

render((
  <Router history={hashHistory}>
    <Route component={App}>
      <Route component={MainLayout} onEnter={authenticate}>
        <Route path="/" component={Overview} />  
        <Route path="/user" component={UserView} />
        <Route path="/overview" component={Overview}/>
        <Route path="/exercise" component={LoggingExercise}/>
        <Route path="/admin" component={Dashboard} />
        <Route path="/slack" component={Slack} />
        <Route path="/calendar" component={Calendar} />
      </Route>
      <Route path="auth" component={AuthLayout}>
        <IndexRedirect to="login" />
        <Route path="login" component={Login}/>
      </Route>
    </Route>
  </Router>
), document.getElementById('app'));


//write callback function to make asynchronous 
var cb = function() {
  console.log("I'm here to make requireAuth asynchronous!");
};

// function authenticate(next, replace, cb) {
//   console.log(document.cookie);
//   //check if document.cookie is there
//   if (document.cookie) {
//     //slice off 'token='
//     var token = document.cookie.slice(6);
//     axios.get('/users/auth', {
//       headers: { token: token || null }
//     })
//     .then(function (res) {
//       console.log(res);
//       //res.data.user = user email
//       //res.data.id = user id
//       cb(); //used to exit the authenticate function, does nothing
//     })
//     .catch(function (err) {
//       replace({
//         // pathname: /*'/auth/signin',*/ //replace with valid pathname
//         state: {
//           nextPathName: next.location.pathname
//         }
//       });
//       blah(); //does nothing!
//     });
//   }
// }

function authenticate() {
  console.log('authenticate is called');
  axios.get('/testing')
  .then(function(res) {
    console.log(res);
  })
}


