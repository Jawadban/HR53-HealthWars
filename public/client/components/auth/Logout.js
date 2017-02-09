import React from 'react';

export default class Logout extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.authLogout();
  }

  render() {

    return (
      <div>
        <h1>Logout Page Goes Here</h1>
      </div>
    )

  }
}
