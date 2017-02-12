import React from 'react';
import axios from 'axios';


export default class AddExercise extends React.Component {

  constructor(props) {

    super(props);

    this.state = {};

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // Manually add an exercise to the database
  handleSubmit(event) {
    event.preventDefault();
    var context = this;
    axios.post('/api/exercises', {
      'name': this.refs.name.value, 
      'unit': this.refs.unit.value, 
      'description': this.refs.description.value, 
    }).then(function(res) {
      alert('NEW COMPETITION SUBMITTED!');
    });
  }

  render() {
    return (
        <div className='admin-form'>
          <h5>New Exercise</h5>
          <form className="form" onSubmit={this.handleSubmit}>
            <input className="form-control" type="text" name="name" placeholder="Name" ref="name" />
            <input className="form-control" type="text" name="unit" placeholder="Unit Measure" ref="unit" />
            <input className="form-control" type="text" name="description" placeholder="Exercise Description" ref="description" />
            <button className="btn btn-primary admin-button" type="submit" value="Add Exercise">Add Exercise</button>
          </form><br />
        </div>  
    )
  }
}