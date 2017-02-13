import React from 'react';
import UserTotal from './UserTotal.js';
import axios from 'axios';


export default class Overview extends React.Component {

  constructor() {
    super();
    this.state = {
      stars: [],
    };
  }

  // scans for change in props for use on the page
  componentWillReceiveProps(nextProps) {
     
  }

  componentDidMount () {
    var context = this;
    axios.get('/api/stars2/').then(function(res) {

      var storage = {};
      var allData = [];

      for (var i = 0; i < res.data.length; i++) {

        if (storage[res.data[i].id] === undefined) {
          storage[res.data[i].id] = {
            name: res.data[i].name,
            team: res.data[i].team,
            stars: []
          };
        }
        if (res.data[i].star_id !== null) {
          storage[res.data[i].id].stars.push(res.data[i]);
        }
      }

      // for (var user in storage) {
      //   allData.push(user);
      // }

      console.log('Storage', storage);
      context.setState({stars: storage});
    });
    
  }

  render() {

    // var starsAll = this.state.stars;

    // for (var user in starsAll) {
    //   console.log('USER', starsAll[user]);


    // }

    const listItems = Object.keys(this.state.stars).map((user, i) =>
      <UserTotal key={i} user={this.state.stars[user]} />
    );

    return (


      

      <div id='overview' className='text-center'>
        <div className='overview-header'>
          <h2>Overall Leaderboard</h2>
        </div>
        <table className='table'>
          <thead>
            <tr>
              <th>Name</th>
              <th>Team</th>
              <th>Count</th>
              <th>Stars</th>
            </tr>
          </thead>
          <tbody> 

            {listItems}
         
          </tbody>
        </table>
      </div>
    )


  }
}

//<UserTotal key={i} className='texttd' name={person.name} team={person.team} total={person.total} />

