import React from 'react';

export default class AuthLayout extends React.Component {

  render() {

    var children = React.Children.map(this.props.children, function(child) {
      return React.cloneElement(child, this.props)
    }.bind(this))

    return (
      <div>
        {children}
      </div>
    )

  }
}
