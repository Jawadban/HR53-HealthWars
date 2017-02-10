import React from 'react';
import {Router, Route, IndexRoute, hashHistory, IndexRedirect, browserHistory} from 'react-router';
import NavigationBar from './Navbar';


export default class MainLayout extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    //this.protect();
  }

  protect() {
    if (!this.props.loggedIn) {
      console.log('WE MUST PROTECT THIS HOUSE!');
      this.props.router.push('/auth/login');
    }
  }

  render() {

    var children = React.Children.map(this.props.children, function(child) {
      return React.cloneElement(child, this.props)
    }.bind(this))

    return (
      <div>
        <NavigationBar authLogout={this.props.authLogout} />
        {children}
      </div>
    )

  }
}
