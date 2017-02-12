var mysql = require('promise-mysql');
var connection;

module.exports = {

  newExercise : function(req, res, next) {
    return mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'healthwars'
    }).then(function(conn){
        connection = conn;
        console.log('BODY', req.body);
        var sql = `insert into exercises values (null, '${req.body.name}', '${req.body.unit}', '${req.body.description}')`;
        console.log('insert exercises sql: ', sql);
        return connection.query(sql);
    }).then(function(rows){
        console.log(rows);
        res.json(rows);
        
    }); 


  },

  getExercises : function(req, res, next) {
    return mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'healthwars'
    }).then(function(conn){
        connection = conn;
        return connection.query('select * from exercises');
    }).then(function(rows){
        console.log(rows);
        res.json(rows);
        
    });
  },

  getExercise : function(req, res, next) {
    return findExercise(req.body).then(function(exercise){
      if(exercise) {
        res.json(exercise);
      }
      next();
    }).fail(function(err){
      next(err);
    });
  }

};