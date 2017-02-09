import React from 'react';
import $ from 'jquery';


export default class Slack extends React.Component {

  constructor() {
    super();
    this.state = {
      message: ''
     // users: null, // this is more or less used as a check for new props
    //  data: [] // this is the data to be used to sort the Overview table
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({message: event.target.value});
    console.log(this.state.message);
  }

  handleSubmit(event) {
    var url = "https://hooks.slack.com/services/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";
    $.ajax({
      data: 'payload=' + JSON.stringify({"text": this.state.message}),
      dataType: 'json',
      processData: false,
      type: 'POST',
      url: url
    });
    console.log('Submitted!');
    //alert('A name was submitted: ' + this.state.value);
    //event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Message:
          <input type="text" value={this.state.message} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
