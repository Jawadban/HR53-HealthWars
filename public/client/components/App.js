import React from 'react';
import LoggingExercise from './exercise/LoggingExercise';
import Overview from './overview/Overview.js';
import NavigationBar from './Navbar';
import axios from 'axios';

export default class App extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      rounds: null,
      users: null,
      exercise: null,
      currentUser: null,
      loggedIn: false,
    }
  }

  // pulls all information from the DB and sets the states above which by default are null
  componentDidMount () {
    this.updateData();
  }

  updateData () {
    var context = this;
    axios.get('/api/rounds').then(function(res) {
      context.setState({rounds: res.data});
    });
    axios.get('/api/users').then(function(res) {
      context.setState({users: res.data});
    });
    axios.get('/api/exercises').then(function(res) {
      context.setState({exercise: res.data});
    });
    axios.get('/api/users/jfbriggs').then(function(res) {
      context.setState({currentUser: res.data});
    });
  }

  authLogin () {
    console.log('Login User');
    this.setState(prevState => ({
      loggedIn: true
    }));
    this.props.router.push('/');
  }

  authLogout () {
    console.log('Logout User');
    this.setState(prevState => ({
      loggedIn: false
    }));
    this.props.router.push('/auth/login');
  }

  render() {

    // Save state as new object so can add functions to pass down
    var newState = this.state;
    newState.updateData = this.updateData.bind(this);
    newState.authLogin = this.authLogin.bind(this);
    newState.authLogout = this.authLogout.bind(this);

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