import React from 'react';
import axios from 'axios';
import { ButtonToolbar, DropdownButton, NavDropdown, MenuItem } from 'react-bootstrap';



export default class NewRound extends React.Component {

  constructor() {
    super();
    this.state = {
      exercises: [],
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    var context = this;
    axios.post('/api/rounds', {
      'name': this.refs.name.value, 
      'id_exercises': this.refs.exercise_id.value
    }).then(function(res) {
      alert('NEW COMPETITION SUBMITTED!');
      context.props.updateData();
    });
  }

  render() {

    return (
        <div className='admin-form' id='newround' onSubmit={this.handleSubmit}>
          
          <form className="form" >
        
            <input type="text" className="form-control" name="name" placeholder="Round Name" ref="name" />
          

            <select className="exercise-dropdown form-control" name="exercise" form='newround' ref="exercise_id" >
              { this.props.exercises.map((exercise, i) =>
              <option key={i} value={exercise.id}>{exercise.name}</option>
              ) }
            </select>

            <button className="btn btn-primary admin-button" type="submit" value="Add User">Start Next Round</button>
          </form>
        </div>
    )
 
    
  }
}