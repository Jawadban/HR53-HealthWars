import React from 'react';

export default class Slack extends React.Component {

  constructor() {
    super();
    this.state = {
      //message: '',
    };
  }

  render() {
    return (
      <div>
      <h1>Schedule of Events</h1>

      <p>Featured Event: Stair Challenge! Click button below to add to your calendar.</p>

       <a target="_blank" href="https://calendar.google.com/calendar/event?action=TEMPLATE&amp;tmeid=bmticGk5ZGc1OXZhYTljcmVtZGgyc2RwNWsgMWIwOWs5dnRnajVxNGtyNmhoMTgyb2xqcDRAZw&amp;tmsrc=1b09k9vtgj5q4kr6hh182oljp4%40group.calendar.google.com">
       <img src="https://www.google.com/calendar/images/ext/gc_button1_en.gif"></img></a>

      <iframe src="https://calendar.google.com/calendar/embed?src=1b09k9vtgj5q4kr6hh182oljp4%40group.calendar.google.com&ctz=America/Los_Angeles"
       style={{border: 0}} width="800" height="600" frameBorder="0" scrolling="no"></iframe>



      </div>
    );
  }

}
