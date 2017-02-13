import React from 'react';
import UserTotal from './UserTotal.js';
import axios from 'axios';


export default class Overview extends React.Component {

  constructor() {
    super();
    this.state = {
      stars: [],
      teams: [],
      roundValue: 999,
      teamValue: 999
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleChangeTeam = this.handleChangeTeam.bind(this);
  }

  // scans for change in props for use on the page
  componentWillReceiveProps(nextProps) {
     
  }

  componentDidMount () {

    var context = this;

    this.getFiltered(999, 999);

    // axios.get('/api/stars2/').then(function(res) {

    //   var storage = {};
    //   var allData = [];

    //   for (var i = 0; i < res.data.length; i++) {

    //     if (storage[res.data[i].id] === undefined) {
    //       storage[res.data[i].id] = {
    //         name: res.data[i].name,
    //         team: res.data[i].team,
    //         stars: []
    //       };
    //     }
    //     if (res.data[i].star_id !== null) {
    //       storage[res.data[i].id].stars.push(res.data[i]);
    //     }
    //   }

    //   // for (var user in storage) {
    //   //   allData.push(user);
    //   // }

    //   console.log('Storage', storage);
    //   context.setState({stars: storage});
    // });
    
  }

  handleChange(event) {
    var context = this;
    this.setState({
      roundValue: event.target.value
    });
    console.log('NEW VALUE', this.state.roundValue);
    this.getFiltered(this.state.teamValue, event.target.value);
  
  }

  handleChangeTeam(event) {
    var context = this;
    this.setState({
      teamValue: event.target.value
    });
    console.log('NEW TEAM VALUE', event.target.value);
    this.getFiltered(event.target.value, this.state.roundValue);
  
  }

  getFiltered(team, round) {
    var context = this;
    var route = `/api/stars2/team/${team}/round/${round}`;
    axios.get(route).then(function(res) {
      console.log('UPDATING FILTER STARS', route);
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
      context.setState({stars: storage});
    });
  }


  render() {

    // var starsAll = this.state.stars;

    // for (var user in starsAll) {
    //   console.log('USER', starsAll[user]);


    // }
    var round = this.state.roundValue;
    const listItems = Object.keys(this.state.stars).map((user, i) =>
      <UserTotal key={i} user={this.state.stars[user]} round={round} />
    );

    return (


      

      <div id='overview' className='text-center'>
        <div className='overview-header'>
          <h2>Overall Leaderboard</h2>

          <select className="form-control" name="team" ref="team_id" value={this.state.teamValue} onChange={this.handleChangeTeam} >
            <option key='999' value='999'>All Teams</option>
            { this.props.teams.map((team, i) =>
            <option key={i} value={team.id}>{team.name}</option>
            ) }
          </select>

          <select className="form-control" name="round" ref="round_id" value={this.state.roundValue} onChange={this.handleChange} >
            <option key='999' value='999'>All Rounds</option>
            { this.props.rounds.map((round, i) =>
            <option key={i} value={round.id}>{round.name}</option>
            ) }
          </select>

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

