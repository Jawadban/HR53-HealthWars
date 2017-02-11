var mysql = require('promise-mysql');
//var Promises = require('bluebird');
var connection;

module.exports = {

  newUser : function(req, res, next) {
    var sql = `insert into users values (null, '${req.query.name}', '${req.query.username}', '${req.query.team_id}')`;
    return mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'healthwars'
    }).then(function(conn){
        connection = conn;
        return connection.query(sql);
    }).then(function(rows){
        console.log(rows);
        res.json(rows);
        
    });
  },

  getUsers : function(req, res, next) {
    return mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'healthwars'
    }).then(function(conn){
        connection = conn;
  
        return connection.query('select * from users');
    }).then(function(rows){
        // Logs out a list of hobbits 
        console.log(rows);
        res.json(rows);
        
    });
  },
  
  getUser : function(req, res, next) {
    var sql = `select * from users where username = '${req.params.username}'`;
    console.log('sql', sql);
    return mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'healthwars'
    }).then(function(conn){
        connection = conn;
        return connection.query(sql);
    }).then(function(rows){
        console.log(rows);
        res.json(rows);
        
    });
  },



};