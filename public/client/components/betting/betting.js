import React from 'react';
import $ from 'jquery';
import axios from 'axios';

export default class Betting extends React.Component {

  constructor(props) {
    super();
    this.state = {
      numStars: 0,
      currUser: '',
      username: '',
      description: '',
      winner: '', 
      users: [], 
      challenger: '',
      competitor: '',
      starsChallenged: 1
    };
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handleStarsChange = this.handleStarsChange.bind(this);
    this.handleDescChange = this.handleDescChange.bind(this);
    this.handleWinnerChange = this.handleWinnerChange.bind(this);
    this.handleCurrChange = this.handleCurrChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentWillMount () {
    var context = this;
    axios.get('/api/users2').then(function(res) {
      context.setState({users: res.data});
    });
  }

  handleUsernameChange(event) {
    this.setState({username: event.target.value});
    console.log(this.state.username);
  }

  handleCurrChange(event) {
    this.setState({currUser: event.target.value});
    console.log(this.state.currUser);
  }

  handleStarsChange(event) {
    this.setState({numStars: event.target.value});
    console.log(this.state.numStars);
  }

  handleDescChange(event) {
    this.setState({description: event.target.value});
    console.log(this.state.description);
  }

  handleWinnerChange(event) {
    this.setState({winner: event.target.value});
    console.log(this.state.winner);
  }

  handleSubmit(event) {
    event.preventDefault();
    // axios.post('/betting', JSON.stringify(this.state)).then(function(res) {
    //   console.log("data: " + data);
    //   alert('success');
    // });
    alert('Bet Placed. Good luck!');

  }

  render() {
    return (

      <div>
        <h2>Place a Bet</h2>

        <hr />

        <div className="row">
          <div className="col-sm-6 col-sm-offset-3 well text-left">
            <p>Want to challenge your friends in competitive challenges? 
            Enter the information below to place a bet and jump to the top of the leaderboard!
            </p>
            <form onSubmit={this.handleSubmit}>


              <div className="form-group">
                  <label>Competitor to Challenge:</label>
                  <select className="form-control" name="user" ref="competitor" onChange={this.handleUsernameChange} >
                    { this.state.users.map((user, i) =>
                    <option key={i} value={user.id}>{user.name}</option>
                    ) }
                  </select>
               </div>

              <div className="form-group">
                  <label>Number of Stars to Bet:</label>
                  <select className="form-control" name="user" ref="competitor" onChange={this.handleStarsChange} >
                    <option key="1" value="1">1</option>
                    <option key="2" value="2">2</option>
                    <option key="3" value="3">3</option>
                    <option key="4" value="4">4</option>
                    <option key="5" value="5">5</option>
                  </select>
              </div>
              
              <div className="form-group">
                  <label>Message:</label>
                  <textarea className="form-control" value={this.state.description} onChange={this.handleDescChange} />
              </div>

              <button className="btn-lg btn-primary" type="submit" value="Add User">Place Bet</button>
              
            </form>
          </div>
        </div>

      </div>


    );
  }

}


