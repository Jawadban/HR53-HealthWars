var FacebookStrategy = require('passport-facebook').Strategy;
var mongoose = require('mongoose');

//load user model
var User = require('./server/dbmodules/users/userModel.js');

//load api keys
var Keys = require('./keys.js');

module.exports = function(passport) {
  // used to serialize the user for the session
  passport.serializeUser(function(user, done) {
    console.log('USER FROM SERIALIZE USER, ', user.facebook.id);
    done(null, user.facebook.id);
  });
  
  passport.deserializeUser(function(id, done) {
    User.findOne({
      'id': id
    }, function(err, user) {
      // console.log('USER FORM deserializeUSER', user);
      done(err, user);
    });
  });
}