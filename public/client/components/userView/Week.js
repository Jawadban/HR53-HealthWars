import React from 'react';
import Star from './Star.js';

export default class Week extends React.Component {

  constructor(props) {
    super(props);
    
  }


  renderStars() {

    var arr = [];  
    var myStars;
    this.props.stars === undefined ? myStars = [] : myStars = this.props.stars;

    for(var i = 0; i < myStars.length; i++) {
      arr.push( <Star key={i} color={myStars[i].color} /> );
    }
    return arr;
  }

  render() {

    return (
      <tr className='Week row container-fluid'>
        <td className='weekDates'><h4>Week {this.props.roundNum + 1}: {this.props.round.exercise}</h4></td>
        <td className='amountOfStars text-right'><h4>({this.props.stars === undefined ? 0 : this.props.stars.length})</h4></td>
        <td className='stars col-md-12 vcenter'>{this.renderStars()}</td>
      </tr>
    )
  }
}