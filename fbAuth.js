var FacebookStrategy = require('passport-facebook').Strategy;
var mongoose = require('mongoose');

//load user model
var User = require('./server/dbmodules/users/userModel.js');

//load api keys
var Keys = require('./keys.js');

module.exports = function(passport) {
  
  // used to serialize the user for the session
  passport.serializeUser(function(user, done) {
    done(null, user);
  });
  
  passport.deserializeUser(function(id, done) {
    User.findOne({
      'id': id
    }, function(err, user) {
      done(err, user);
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
      // use facebook info to find matching user in our database
      User.findOne({ 'facebook.id': profile.id }, function(err, user) {
        if (err) {
          console.log('ERR IN GENERAL', err);
          return done(err);
        } 
        if (user) {
          return done(null, user);
        } else {
          // create new user if none is found
          var newUser = new User();
          console.log('NEWUSER.FACEBOOK', newUser.facebook, token);
          newUser.facebook.token = token;
          newUser.facebook.id = profile.id;
          newUser.facebook.name = profile.displayName;
          // pass new user back to passport after saving to database
          newUser.save(function (err) {
            return err ? done(err) : done(null, newUser);
          });
        }
      })
    });
  }));
};