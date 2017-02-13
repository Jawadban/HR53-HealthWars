import React from 'react';
import Star from './Star.js';

export default class UserTotal extends React.Component {
  constructor(props) {
    super(props);
  }

  renderStars() {

    var arr = [];  
    var myStars;
    this.props.user.stars === undefined ? myStars = [] : myStars = this.props.user.stars;

    for(var i = 0; i < myStars.length; i++) {
      arr.push( <Star key={i} color={myStars[i].color} /> );
    }
    return arr;
  }

  countStars() {
    var arr = [];  
    var myStars;
    this.props.user.stars === undefined ? myStars = [] : myStars = this.props.user.stars;
    return myStars.length;
  }

  render() {
    return (
      <tr>
        <td className='texttd'>{this.props.user.name}</td>
        <td className='texttd'>{this.props.user.team}</td>
        <td className='texttd'>{this.countStars()}</td>
        <td className='texttd'>
        {this.renderStars()}
        </td>
      </tr>
    )
  }
}