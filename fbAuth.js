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
  
  // pull in our info from keys.js
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
    console.log('PROFILE INFO RETURNED FROM FACEBOOK', profile);
    console.log('PROFILE DETAILS:  ', profile._json.friends.data)
    // console.log("TOKEN RETURNED PASSPORT:  ", token)
    
    process.nextTick(function() {
      // use facebook info to find matching user in our database
      User.findOne({ 'facebook.id': profile.id }, function(err, user) {
        // console.log('PROFILE.ID', profile.id)
        // console.log('user', user);
        // console.log('err', err);
        // if there is an error, stop everything and return that
        // ie an error connecting to the database
        if (err) {
          console.log('ERR IN GENERAL', err);
          return done(err);
        } 
        if (user) {
          // pass user back to passport if found
          console.log('USER FOUND IN DATABASE', user);
          return done(null, user);
        } else {
          // create new user if none is found
          
          var newUser = new User();
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

console.log('required facebook`s authentication auth.js file');