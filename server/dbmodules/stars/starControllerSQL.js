var mysql = require('promise-mysql');
//var Promises = require('bluebird');
var connection;

module.exports = {

    // Get All Stars Data
    getStars : function(req, res, next) {
      return mysql.createConnection({
          host: 'localhost',
          user: 'root',
          password: '',
          database: 'healthwars'
      }).then(function(conn){
          connection = conn;
          var sql = `select u.id, u.name, t.name as team, s.id as star_id, s.color, s.id_competition
                      from users u
                      left join stars s on u.id = s.id_users
                      left join teams t on t.id = u.id_teams`;
          //console.log('stars sql: ', sql);
          return connection.query(sql);
      }).then(function(rows){
          //console.log(rows);
          res.json(rows);
          
      });
    },

    getUserStars : function(req, res, next) {
      return mysql.createConnection({
          host: 'localhost',
          user: 'root',
          password: '',
          database: 'healthwars'
      }).then(function(conn){
          connection = conn;
          var sql = `select * from stars where id_users = ${req.params.id}`;
          //console.log('stars sql: ', sql);
          return connection.query(sql);
      }).then(function(rows){
          //console.log(rows);
          res.json(rows);
          
      });
    },

    getStarsFiltered : function(req, res, next) {
      return mysql.createConnection({
          host: 'localhost',
          user: 'root',
          password: '',
          database: 'healthwars'
      }).then(function(conn){
          connection = conn;
          var teamSQL = '';
          var roundSQL = '';

          if (req.params.team_id === '999') {
            teamSQL = `where u.id_teams > 0`;
          } else {
            teamSQL = `where u.id_teams = ${req.params.team_id}`;
          }

          if (req.params.round_id === '999') {
            roundSQL = `and s.id_competition > 0`;
          } else {
            roundSQL = `and s.id_competition = ${req.params.round_id}`;
          }
          var sql = `select u.id, u.name, t.name as team, s.id as star_id, s.color, s.id_competition
                      from users u
                      left join stars s on u.id = s.id_users
                      left join teams t on t.id = u.id_teams
                      ${teamSQL}
                      ${roundSQL}`;
          console.log('stars filtered sql: ', sql);
          return connection.query(sql);
      }).then(function(rows){
          //console.log(rows);
          res.json(rows);
          
      });
    },

    newStar : function(req, res, next) {
      return mysql.createConnection({
          host: 'localhost',
          user: 'root',
          password: '',
          database: 'healthwars'
      }).then(function(conn){
          connection = conn;
          //console.log('BODY', req.body);
          //console.log('QUERY', req.params);
          var sql = `insert into stars values (null, '${req.body.color}', ${req.body.id_users}, ${req.body.id_competition})`;
          console.log('insert stars sql: ', sql);
          return connection.query(sql);
      }).then(function(rows){
          //console.log(rows);
          res.json(rows);
          
      });
    },



};