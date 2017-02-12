import React from 'react';
import axios from 'axios';
import AddUser from './AddUser.js';
import AddExercise from './AddExercise.js';
import NewRound from './NewRound.js';


export default class Dashboard extends React.Component {

  constructor() {

    super();

    this.state = {
      exercises: [],
      teams: []
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.currentUser !== null) {
      if (this.props.rounds.length > 0) {
        var current = this.props.rounds[this.props.rounds.length - 1];
        this.setState({
          currentRound: current.name,
          currentExercise: current.exercise_name, 
          currRoundId: current.id,
          currentExUnit: current.unit
        });
      }
    }
  }

  componentWillMount() {
    if (this.props.currentUser !== null) {
      if (this.props.rounds.length > 0) {
        var current = this.props.rounds[this.props.rounds.length - 1];
        this.setState({
          currentRound: current.name,
          currentExercise: current.exercise_name, 
          currRoundId: current.id,
          currentExUnit: current.unit,
        });
      }
    }
    this.getExercises();
    this.getTeams();
  }

  getExercises() {
    var context = this;
    axios.get('/api/exercises').then(function(res) {
      context.setState({exercises: res.data});
    });
  }

  getTeams() {
    var context = this;
    axios.get('/api/teams').then(function(res) {
      context.setState({teams: res.data});
    });
  }


  render() {
    return (
        <div className='admin-form container'>
          <div className='row'>
            <div className="col-sm-offset-3 col-sm-6">
              <div className='admin-header'>
                <h2>Administrator Dashboard</h2>
                <p>Current Round: {this.state.currentRound}</p>
                <p>Current Exercise: {this.state.currentExercise}</p>
              </div>
              <div>
                <NewRound updateData={this.props.updateData} exercises={this.state.exercises} />
                <AddUser teams={this.state.teams} />
              </div>
            </div>
          </div>
        </div>
    )
  }
}


//
//<AddExercise />

        