var mysql = require('promise-mysql');
//var Promises = require('bluebird');
var connection;

module.exports = {

    getUserStars : function(req, res, next) {
      return mysql.createConnection({
          host: 'localhost',
          user: 'root',
          password: '',
          database: 'healthwars'
      }).then(function(conn){
          connection = conn;
          var sql = `select * from stars where id_users = ${req.params.id}`;
          console.log('stars sql: ', sql);
          return connection.query(sql);
      }).then(function(rows){
          console.log(rows);
          res.json(rows);
          
      });
    },

};