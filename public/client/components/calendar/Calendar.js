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
        <h2>Health Wars Schedule</h2>

        <hr />

        <div className="row">
          <div className="col-sm-12 well text-left">
            <p>Featured Event: Stair Challenge! Click button below to add to your calendar.</p>

             <a target="_blank" href="https://calendar.google.com/calendar/event?action=TEMPLATE&amp;tmeid=bmticGk5ZGc1OXZhYTljcmVtZGgyc2RwNWsgMWIwOWs5dnRnajVxNGtyNmhoMTgyb2xqcDRAZw&amp;tmsrc=1b09k9vtgj5q4kr6hh182oljp4%40group.calendar.google.com">
             <img src="https://www.google.com/calendar/images/ext/gc_button1_en.gif"></img></a>

             <div className="embed-responsive embed-responsive-4by3">
               <iframe className="embed-responsive-item" src="https://calendar.google.com/calendar/embed?src=1b09k9vtgj5q4kr6hh182oljp4%40group.calendar.google.com&ctz=America/Los_Angeles"></iframe>
             </div>


          </div>
        </div>

      </div>

    );
  }

}
