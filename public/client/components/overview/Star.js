import React from 'react';

export default class Star extends React.Component {
  render() {
    var style = {
      color: this.props.color
    }
    return (
      <span style={style} className="glyphicon glyphicon-star" />
    )
  }
}