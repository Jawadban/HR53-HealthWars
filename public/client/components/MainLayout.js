import React from 'react';
import NavigationBar from './Navbar';


export default class MainLayout extends React.Component {

  render() {

    var children = React.Children.map(this.props.children, function(child) {
      return React.cloneElement(child, this.props)
    }.bind(this))

    return (
      <div>
        <NavigationBar />
        {children}
      </div>
    )

  }
}
