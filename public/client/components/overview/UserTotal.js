import React from 'react';
import Star from './Star.js';

export default class UserTotal extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      user: nextProps.user,
      round: nextProps.round
    });
  }
  componentWillMount() {
    this.setState({
      user: this.props.user,
      round: this.props.round
    });
  }

  renderStars(type) {

    var arr = [];  
    var myStars;
    this.state.user.stars === undefined ? myStars = [] : myStars = this.state.user.stars;

    for(var i = 0; i < myStars.length; i++) {
      //if (myStars[i].id_competition === this.state.round) {
        arr.push( <Star key={i} color={myStars[i].color} /> );
      //}
    }
    if (type === 2) {
      return arr.length;
    } else {
      return arr;
    }
  }

  countStars() {
    var arr = [];  
    var myStars;
    this.state.user.stars === undefined ? myStars = [] : myStars = this.state.user.stars;
    return myStars.length;
    //return this.state.round;
  }

  render() {
    return (
      <tr>
        <td className='texttd'>{this.state.user.name}</td>
        <td className='texttd'>{this.state.user.team}</td>
        <td className='texttd'>{this.renderStars(2)}</td>
        <td className='texttd'>
        {this.renderStars(1)}
        </td>
      </tr>
    )
  }
}