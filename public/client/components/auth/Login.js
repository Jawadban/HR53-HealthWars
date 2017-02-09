import React from 'react';

export default class Login extends React.Component {

  render() {

    return (
      <div>
        <h1>Login Page Goes Here</h1>
        <button onClick={this.props.authLogin}>Login</button>
      </div>
    )

  }
}
