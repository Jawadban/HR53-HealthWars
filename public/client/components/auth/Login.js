import React from 'react';
export default class Login extends React.Component {

  render() {

    return (
      <div>
        <h1>Login!</h1>

        <input id="authUserName" type="text" label="Username" placeholder="jfbriggs" onKeyUp={this.props.authUsernameChange} />

        <button onClick={this.props.authLogin}>Login</button>
        <br/>
        <a href="/auth/facebook"><img className="btn-fb" src="client/assets/fbButton.png" width="224" /></a>
        <br/>
      </div>
    )

  }
}
