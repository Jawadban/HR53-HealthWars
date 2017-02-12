import React from 'react';
import axios from 'axios';


export default class AddUser extends React.Component {

  constructor(props) {

    super(props);

    this.state = {

    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // Manually add a user to the database
  handleSubmit(e) {
    e.preventDefault();
    var context = this;
    axios.post('/api/users/admin', {
      'name': this.refs.name.value, 
      'username': this.refs.username.value, 
      'id_teams': this.refs.id_teams.value
    }).then(function(res) {
      alert('NEW User SUBMITTED!');
    });
  }


  render() {
    return (
        <div className='admin-form'>
          <form className="form" onSubmit={this.handleSubmit}>
            <h5>New User</h5>
            <input className="form-control" type="text" name="name" placeholder="Name" ref="name" />
            <input className="form-control" type="text" name="username" placeholder="Username" ref="username" />
            
            <select className="form-control" name="exercise" ref="id_teams" >
              { this.props.teams.map((team, i) =>
              <option key={i} value={team.id}>{team.name}</option>
              ) }
            </select>

            <button className="btn btn-primary admin-button" type="submit" value="Add User">Add User</button>
          </form><br />
        </div>
    )
  }
}