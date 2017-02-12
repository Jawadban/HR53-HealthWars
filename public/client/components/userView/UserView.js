import React from 'react';
import UserDescription from './UserDescription';
import Week from './Week';
import Star from './Star';

export default class UserView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: null,
      userStars: null
    };
  }

  // listens for change in props from App.js and sets the state to the new values
  componentWillReceiveProps(nextProps) {
    if (nextProps.currentUser !== null) {
      this.setState({currentUser: nextProps.currentUser})
    }
    if (nextProps.userStars !== null) {
      this.setState({userStars: nextProps.userStars})
    }
  }

  componentDidMount() {
    this.setState({
      currentUser: this.props.currentUser,
      userStars: this.props.userStars
    })
  }


  render() {


    if (this.state.userStars !== null) {
      var myStars = '';
      var roundStars = {};
      var userStars = this.state.userStars;
      for(var i = 0; i < userStars.length; i++) {
        if (!roundStars[userStars[i].id_competition]) {
          roundStars[userStars[i].id_competition] = [];
        }
        roundStars[userStars[i].id_competition].push(userStars[i]);
      }
    }
    // console.log('roundStars', roundStars);
    // console.log('this.state.currentUser', this.state.currentUser);

    if(this.state.currentUser !== null && roundStars !== undefined) {
      return (
      <div id='UserView'>
        <UserDescription user={this.state.currentUser}/> 
        <table className="container row">
          <tbody>
            {this.props.rounds.map( (round, i) => {
              return <Week key={i} round={round} stars={roundStars[round.id]} roundNum={i} />
            })}
          </tbody>
        </table>
        
      </div>
      )
    } else {

      return (

        <h3>LOADING</h3>

      )
    }

  }
}

