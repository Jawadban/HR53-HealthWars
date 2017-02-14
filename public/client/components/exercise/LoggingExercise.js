import React from 'react';
import ChangeUnits from './ChangeUnits';
import SubmitUnits from './SubmitUnits';
import DropdownSelector from './DropdownSelector';
import axios from 'axios';
import { Link } from 'react-router';


export default class LoggingExercise extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      units: 0,
      currentRound: null,
      currentExercise: null,
      currRoundId: null,
      currentExUnit: null,
      value: 'Red'
    }
    this.unitChange = this.unitChange.bind(this);
    this.submitClick = this.submitClick.bind(this);
    this.submitStar = this.submitStar.bind(this);
    this.change = this.change.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.currentUser !== null) {
      var current = this.props.rounds[this.props.rounds.length - 1];
      this.setState({
        currentRound: current.name,
        currentExercise: current.exercise_name, 
        currRoundId: current.id,
        currentExUnit: current.unit
      });
    }
  }

  componentDidMount() {
    if (this.props.currentUser !== null) {
      var current = this.props.rounds[this.props.rounds.length - 1];
      this.setState({
        currentRound: current.name,
        currentExercise: current.exercise_name, 
        currRoundId: current.id,
        currentExUnit: current.unit
      });
    
    }
  }

  unitChange(type) {
    if (type === '-' && this.state.units > 0) {
      this.setState({units: this.state.units - 1});
    } else if (type === '+') {
      this.setState({units: this.state.units + 1});
    }
  }

  submitClick(data) {

    var user = this.props.currentUser.username;
    var units = this.state.units;
    var currentScores = this.props.currentUser.scores;

    // console.log('Current scores:', currentScores);
    // Change user's in-state scores array: increment last element (current round's score)
    currentScores[currentScores.length - 1] += units;

    // Post scores back to database
    axios.post('/api/users/' + user + '/scores', {'scores': currentScores});
    console.log('Updated scores for', user, 'posted to database!');

    // reset visible unit counter back to 0
    this.setState({units: 0});
    this.props.updateData();
  }

  submitStar() {
    console.log('SUBMIT STAR!');
    var context = this;
    for (var i = 0; i < this.state.units; i++){
      axios.post('/api/stars2/', {
        'color': context.state.value, 
        'id_users': context.props.currentUser.id, 
        'id_competition': context.state.currRoundId
      }).then(function(res) {
      console.log('STAR SUBMITTED!');
        // axios.get('/api/stars2/user/' + context.props.currentUser.id).then(function(res){
        //   console.log('STAR ADDED', res.data[res.data.length-1].color);
        // });
      });
    }
    this.setState({units: 0});
    this.props.updateData();
  }

  change(event) {
    this.setState({value: event.target.value});
  }

  render() {
    return (
      <div>
        <h2>Record Completed Exercise</h2>

        <hr />

        <div className="row well well-lg">
          <div className="col-sm-6">

            <h3>Current Round:</h3>
            <h4>{this.state.currentRound}</h4>
            <hr />

            <h3>Current Exercise:</h3>
            <h4>{this.state.currentExercise}</h4>
            <hr />

            <h3>Exercise Unit:</h3>
            <h4>{this.state.currentExUnit}</h4>

          </div>
          <div className="col-sm-6">

            <table className="table">
              <tbody>
                <tr>
                  <td><ChangeUnits onClick={this.unitChange} type={'-'} /></td>
                  <td><div className="unit-display">{ this.state.units }</div> </td>
                  <td><ChangeUnits onClick={this.unitChange} type={'+'} /></td>
                </tr>
                <tr>
                  <td colSpan="3">
                  <select className="form-control" onChange={this.change} value={this.state.value}>
                  <option>Red</option>
                  <option>Blue</option>
                  <option>Green</option>
                  <option>Yellow</option>
                  <option>Gold</option>
                  </select>
                  </td>
                </tr>
              </tbody>
            </table>
            <Link to={`/user`}><SubmitUnits onClick={this.submitStar} data={this.state.units} href="#/user" /></Link>

          </div>

        </div>
      </div>
     
    )
  }
}