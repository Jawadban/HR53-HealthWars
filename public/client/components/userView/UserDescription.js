import React from 'react';

export default class UserDescription extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      team: ''
    }
  }

  // listens for change in props from App.js and sets the state to the new values
  componentWillReceiveProps(nextProps) {
    if (nextProps.user !== null) {
      this.setState({name: nextProps.user.name});
      this.setState({team: nextProps.user.team});
    }
  }

  componentDidMount() {
    this.setState({name: this.props.user.name})
    this.setState({team: this.props.user.team})
  }

  render() {
    return (
      <div>
        <h2>Welcome, {this.state.name} <small>{this.state.team}</small></h2>

        <hr />

      </div>

    )
  }
}

// temp removing userpicture. Intention is to have user profile picture
// <div id='userpic'><img height='100' width='75' src={dummydata.userpic}/></div>