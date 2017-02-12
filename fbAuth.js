var FacebookStrategy = require('passport-facebook').Strategy;
var mongoose = require('mongoose');
var mysql = require('promise-mysql');
var connection;

//load user model
var User = require('./server/dbmodules/users/userModel.js');

//load api keys
var Keys = require('./keys/facebook.js');

module.exports = function(passport) {
  
  // used to serialize the user for the session
  passport.serializeUser(function(user, done) {
    done(null, user);
  });
  
  passport.deserializeUser(function(id, done) {

    console.log('ID: ', id);

    var sql = `select * from users where id = '${id}'`;
    
    mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'healthwars'
    }).then(function(conn){
        connection = conn;
        return connection.query(sql);
    }).then(function(rows){
        console.log('FACEBOOK!', rows);
        done(null, rows[0]);
    }).catch(function(e) {
    //Catch any unexpected errors
      done(e, null);
    });



  });
  
 
  // pull in our info from keys.js
  passport.use(new FacebookStrategy({
    clientID: Keys.facebook.clientID,
    clientSecret: Keys.facebook.clientSecret,
    callbackURL: Keys.facebook.callbackURL,
    profileFields: ['id', 'displayName', 'photos', 'email', 'friends'],
    scope: ['user_friends', 'email']
  },
  // facebook will send back the token and profile info
  function(token, refreshToken, profile, done) {
    process.nextTick(function() {

      var sql = `select * from users where facebook_id = '${profile.id}'`;
      mysql.createConnection({
          host: 'localhost',
          user: 'root',
          password: '',
          database: 'healthwars'
      }).then(function(conn){
          connection = conn;
          return connection.query(sql);
      }).then(function(rows){

          // if matching record
          if (rows[0]) {
            return done(null, rows[0].id);
          } else {
            var sql2 = `insert into users values (null, '${profile.displayName}', 'username', 3, '${profile.id}', '${token}')`;

            mysql.createConnection({
                host: 'localhost',
                user: 'root',
                password: '',
                database: 'healthwars'
            }).then(function(conn){
                connection = conn;
                return connection.query(sql2);
            }).then(function(rows){
              console.log('ROWS FB', rows.insertId);
              return done(null, rows.insertId);
            });


          }

      }).catch(function(e) {
      //Catch any unexpected errors
        done(e, null);
      });



    });
  }));

};