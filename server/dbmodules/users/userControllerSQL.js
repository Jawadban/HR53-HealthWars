var mysql = require('promise-mysql');
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
        //asdf
        res.json(rows);
        
    });
  },

  // Create new user from admin form
  newUserAdmin : function(req, res, next) {
    var sql = `insert into users values (null, '${req.body.name}', '${req.body.username}', '${req.body.id_teams}', null, null)`;
    
    return mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'healthwars'
    }).then(function(conn){
        connection = conn;
        return connection.query(sql);
    }).then(function(rows){
        
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
        res.json(rows);
        
    });
  },
  
  getUser : function(req, res, next) {
    var sql = `select u.id, u.name, u.username, t.name as team from users u inner join teams t on t.id = u.id_teams where u.id = '${req.params.id}'`;
    
    return mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'healthwars'
    }).then(function(conn){
        connection = conn;
        return connection.query(sql);
    }).then(function(rows){
        
        res.json(rows[0]);
        
    });
  },

  getTeams : function(req, res, next) {
    return mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'healthwars'
    }).then(function(conn){
        connection = conn;
        return connection.query('select * from teams');
    }).then(function(rows){
        res.json(rows);
        
    });
  },

};