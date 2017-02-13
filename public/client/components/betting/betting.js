import React from 'react';
import $ from 'jquery';

export default class Betting extends React.Component {

  constructor(props) {
    super();
    this.state = {
      numStars: 0,
      currUser: '',
      username: '',
      description: '',
      winner: ''
    };
    //console.log(props.currentUser);
    //console.log("state: " + this.state);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handleStarsChange = this.handleStarsChange.bind(this);
    this.handleDescChange = this.handleDescChange.bind(this);
    this.handleWinnerChange = this.handleWinnerChange.bind(this);
    this.handleCurrChange = this.handleCurrChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
   // var url = "https://hooks.slack.com/services/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";
    $.ajax({
      data: JSON.stringify(this.state),
      processData: false,
      dataType: "json", 
      contentType: "application/json",
      type: 'POST',
      url: "/betting",
      // success: function(data) {
      //   console.log("data: " + data);
     // }
    });
   // console.log(this.state);
   // console.log('Submitted!');
    //alert('A name was submitted: ' + this.state.value);
    //event.preventDefault();
  }

  render() {
    return (
      <div>
        <h1>Bets</h1>
        <p>Want to challenge your friends in competitive challenges? 
        Enter the information below to place a bet and jump to the top of the leaderboard!
        </p>
        <form onSubmit={this.handleSubmit}>
        <label>
          Username of Challenger:
          <input type="text" value={this.state.currUser} onChange={this.handleCurrChange} />
        </label>
        <label>
          Username of Competitor:
          <input type="text" value={this.state.username} onChange={this.handleUsernameChange} />
        </label>
        <label>
          Number of Stars:
          <input type="text" value={this.state.numStars} onChange={this.handleStarsChange} />
        </label>
        <label>
          Describe Event Details:
          <input type="text" maxLength='100' value={this.state.description} onChange={this.handleDescChange} />
        </label>
        <label>
          Winner:
          <input type="text" value={this.state.winner} onChange={this.handleWinnerChange}/>
        </label>
        <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }

}
