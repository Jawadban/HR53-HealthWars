import React from 'react';

export default class AuthLayout extends React.Component {

  render() {

    var children = React.Children.map(this.props.children, function(child) {
      return React.cloneElement(child, this.props)
    }.bind(this))

    return (

      <div className="container-fluid auth">
        <div className="row text-center">
          <div className="col-md-4 col-md-offset-4">
            {children}
          </div>
        </div>
      </div>

    )

  }
}
