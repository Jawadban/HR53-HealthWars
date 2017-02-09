import React from 'react';
import { Navbar, Nav, NavDropdown, NavItem, MenuItem } from 'react-bootstrap';
import { Link } from 'react-router'

export default class NavigationBar extends React.Component {
  render() {
    return (
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="#">Health Wars</a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <NavItem eventKey={1} href="#/user">Profile</NavItem>
            <NavItem eventKey={2} href="#/overview">Overview</NavItem>
            <NavItem eventKey={3} href="#/exercise">Exercise</NavItem>
            <NavItem eventKey={4} href="#/admin">Admin Dashboard</NavItem>
            <NavItem eventKey={5} href="#/slack">Slack</NavItem>
          </Nav>
          <Nav pullRight>
            <NavItem eventKey={1} href="#/auth/login">Login</NavItem>
            <NavItem eventKey={1} href="#/auth/logout">Logout</NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
