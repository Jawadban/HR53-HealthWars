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
            <NavItem eventKey={2} href="#/overview">Leaderboard</NavItem>
            <NavItem eventKey={3} href="#/exercise">Exercise</NavItem>
            <NavItem eventKey={4} href="#/admin">Admin Dashboard</NavItem>
            <NavItem eventKey={5} href="#/slack">Slack</NavItem>
            <NavItem eventKey={6} href="#/calendar">Calendar</NavItem>
            <NavItem eventKey={7} href="#/betting">Betting</NavItem>
          </Nav>
          <Nav pullRight>
            <NavItem eventKey={1} onClick={this.props.authLogout}>Logout</NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
