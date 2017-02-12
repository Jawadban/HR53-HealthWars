import React from 'react';
import LoggingExercise from './exercise/LoggingExercise';
import Overview from './overview/Overview.js';
import NavigationBar from './Navbar';
import axios from 'axios';
import HashHistory from 'react-router';

export default class App extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      rounds: null,
      users: null,
      exercise: null,
      currentUser: null,
      loggedIn: false,
      auth_username: null,
      userStars: null
    }
  }

  // pulls all information from the DB and sets the states above which by default are null
  componentDidMount () {
    this.updateData();
  }

  updateData () {

    document.cookie = 'olfsk' + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    document.cookie = 'hblid' + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    function readCookie(name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for(var i=0;i < ca.length;i++) {
            var c = ca[i];
            while (c.charAt(0)==' ') c = c.substring(1,c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
        }
        return null;
    }
    var token = readCookie('token');

    var context = this;
    axios.get('/api/rounds2').then(function(res) {
      context.setState({rounds: res.data});
    });

    // If no username is set, use default
    if (token !== undefined) {
      var user = token;
    } else {
      var user = 2;
      console.log('ERROR, DEFAULT USER USED.');
    }

    console.log('COOKIE', token);

    axios.get('/api/users2/' + user).then(function(res) {
      context.setState({currentUser: res.data});
      console.log('ID SENT:', res.data.id);
      axios.get('/api/stars2/user/' + res.data.id).then(function(res) {
        context.setState({userStars: res.data});
      });
    });


  }

  authLogin () {
    console.log('Login User');
    this.setState(prevState => ({
      loggedIn: true
    }));

    axios.get('/api/users/' + this.state.auth_username).then(function(res) {
      this.setState({currentUser: res.data});
    }.bind(this));

    this.updateData();

    this.props.router.push('/');
  }

  authLogout () {
    var context = this;
    axios.get('/logout').then(function(res) {
      if (res.status === 200) {
        document.cookie = 'token' + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        context.props.router.push('/auth/login');
      }
      console.log('user has been logged out');
    })
  }

  authUsernameChange (event) {
    this.setState({
      auth_username: event.target.value
    });
    console.log('this.state.auth_username', this.state.auth_username);
  }

  render() {

    // Save state as new object so can add functions to pass down
    var newState = this.state;
    newState.updateData = this.updateData.bind(this);
    newState.authLogin = this.authLogin.bind(this);
    newState.authLogout = this.authLogout.bind(this);
    newState.authUsernameChange = this.authUsernameChange.bind(this);

    //Passes all the DB information via states to all components
    var children = React.Children.map(this.props.children, function(child) {
      return React.cloneElement(child, newState)
    }.bind(this));

    return (
      <div>
        {children}
      </div>
    )
  }
}