import React from 'react';
import axios from 'axios';
import { ButtonToolbar, DropdownButton, NavDropdown, MenuItem } from 'react-bootstrap';



export default class NewRound extends React.Component {

  constructor() {

    super();

    this.state = {exercises: []};

    this.newRound = this.newRound.bind(this);
  }

  addData(item) {
    var currentData = this.state.exercises;
    currentData.push(item);
    this.setState({
      exercises: currentData
    });
  }


  componentDidMount() {
    var context = this;

    axios.get('/api/exercises').then(function(res) {
      res.data.forEach(function(exercise) {
        context.addData(exercise.name);
      });

      // console.log(context.state);
    });

  }


  // Manually initiate a new round
  newRound(e) {
    e.preventDefault();

    var roundObj = {
      'name': this.refs.name.value,
      'exercise': this.refs.exercise.value
    };

    var context = this;

    axios.post('/api/rounds', roundObj)
    .then(function(res) {
      // console.log('Next round initiated!');
      alert('Next round initiated!');
      context.refs.name.value = '';
      context.refs.exercise.value = '';

      context.props.updateData();

      // add a new element to every user's scores array for the new round
      //axios.post('/api/users/newround');
      //console.log('Adding new round score value to all users!');
    })
    .catch(function(err) {
      console.log(err);
    });

  }


  render() {
    return (
        <div className='admin-form' id='newround'>
          <p>Initiate Next Round</p>
          <form className="form" onSubmit={this.newRound}>
            <h5>Round Name:</h5>
            <input type="text" className="form-control" name="name" placeholder="Round Name" ref="name" /><br />
            <h5>Exercise:</h5>


            <select className="exercise-dropdown" name="exercise" form='newround' ref="exercise" >
              { this.state.exercises.map((exercise, i) =>
              <option key={i} value={exercise.toString()}>{exercise}</option>
              ) }
            </select><br /><br />



            <button className="btn btn-primary admin-button" type="submit" value="Add User">Start Next Round</button>
          </form><br />
        </div>
    )
  }
}