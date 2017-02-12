import React from 'react';
import {Router, Route, IndexRoute, hashHistory, IndexRedirect, browserHistory} from 'react-router';
import NavigationBar from './Navbar';


export default class MainLayout extends React.Component {

  constructor(props) {
    super(props);
  }

  componentWillReceiveProps() {
    this.protect();
  }
  
  protect() {
    console.log('PROPS IN PROTECT', this.props);
    console.log('document.cookie', document.cookie.slice(6));
    if (!document.cookie.slice(6)) {
      console.log('WE MUST PROTECT THIS HOUSE!');
      hashHistory.push('/auth/login');
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
