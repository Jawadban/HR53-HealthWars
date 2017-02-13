import React from 'react';
import $ from 'jquery';


export default class Slack extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      message: '',
      username: 'mySlackUsername',
      channel: '#healthwars'
     // users: null, // this is more or less used as a check for new props
    //  data: [] // this is the data to be used to sort the Overview table
    };
    this.handleMessageChange = this.handleMessageChange.bind(this);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handleChannelChange = this.handleChannelChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount () {
    if (this.props.currentUser !== null) {
      this.setState({
        username: this.props.currentUser.name
      });
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.currentUser !== null) {
      this.setState({
        username: this.props.currentUser.name
      });
    }
  }

  handleMessageChange(event) {
    this.setState({message: event.target.value});
    console.log(this.state.message);
  }

  handleUsernameChange(event) {
    this.setState({username: event.target.value});
    console.log(this.state.username);
  }

  handleChannelChange(event) {
    this.setState({channel: event.target.value});
    console.log(this.state.channel);
  }

  handleSubmit(event) {
    event.preventDefault();
    var context = this;
    var url = "https://hooks.slack.com/services/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";
    $.ajax({
      data: 'payload=' + JSON.stringify({"username": this.state.username, "text": this.state.message, "channel": this.state.channel}),
      dataType: 'json',
      processData: false,
      type: 'POST',
      url: url, 
      success: function(data) {
        console.log('Submitted!', data);
        context.setState({
           message: '',
        });
        alert('Posted to Slack!');
      },
      error: function(data) {
         console.log('Submitted', data);
         context.setState({
            message: '',
         });
         alert('Posted to Slack!');
      }
    });

  }

  render() {
    return (
      <div>
      <h1>Slack Messages</h1>
      <p>Message your friends on Slack to update them on your progress or invite them to challenges!</p>
      <form onSubmit={this.handleSubmit}>
        <label>
          Message:
          <input type="text" value={this.state.message} onChange={this.handleMessageChange} />
        </label>
        <label>
          Username:
          <input type="text" value={this.state.username} onChange={this.handleUsernameChange} />
        </label>
        <label>
          Channel or @User:
          <input type="text" value={this.state.channel} onChange={this.handleChannelChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
      </div>
    );
  }
}
