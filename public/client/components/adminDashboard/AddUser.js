import React from 'react';
import axios from 'axios';


export default class AddUser extends React.Component {

  constructor(props) {

    super(props);

    this.state = {};

    this.addUser = this.addUser.bind(this);
  }

  // Manually add a user to the database
  addUser(e) {
      e.preventDefault();

      var userObj = {
        'name': this.refs.name.value,
        'username': this.refs.username.value,
        'password': this.refs.password.value,
        'team': this.refs.team.value,
        'scores': []
      };

      var context = this;

      // below function will apply appropriate amount of 0 scores to a user if added after-the-fact (i.e. added in week 3, scores = [0, 0, 0])
      axios.get('/api/rounds').then(function(res) {
        var roundTotal = res.data.length;
        for (var i = 1; i <= roundTotal; i++) {
          userObj.scores.push(0);
        }

        axios.post('/api/users', userObj)
        .then(function(res) {
          // console.log('User added!');
          alert('User added!');
          context.refs.name.value = '';
          context.refs.username.value = '';
          context.refs.password.value = '';
          context.refs.team.value = '';
        })
        .catch(function(err) {
          console.log(err);
        });

      });
    }


  render() {
    return (
        <div className='admin-form'>
          <form className="form" onSubmit={this.addUser}>
            <h5>New User</h5>
            <input className="form-control" type="text" name="name" placeholder="Name" ref="name" />
            <input className="form-control" type="text" name="username" placeholder="Username" ref="username" />
            <input className="form-control" type="text" name="password" placeholder="Password" ref="password" />
            <select className="form-control" name="team" ref="team">
              <option>HR-52</option>
              <option selected>HR-53</option>
              <option>HR-72</option>
              <option>HR-73</option>
            </select>
            <button className="btn btn-primary admin-button" type="submit" value="Add User">Add User</button>
          </form><br />
        </div>
    )
  }
}