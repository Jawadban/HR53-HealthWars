import React from 'react';
export default class Login extends React.Component {

  render() {

    return (

        <div>
          <h1>Health Wars</h1>
          <a href="/auth/facebook">
            <img className="btn-fb" src="client/assets/fbButton.png" width="224"/>
          </a>
        </div>
    )

  }
}
