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
      currentUser: null
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

  render() {

    // Passes all the DB information via states to all components
    var children = React.Children.map(this.props.children, function(child) {
      return React.cloneElement(child, this.state)
    }.bind(this))

    return (
      <div>
        {children}
      </div>
    )
  }
}