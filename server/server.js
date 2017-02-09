var app = require('./route');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var User = require('./dbmodules/users/userModel.js');




var port = process.env.PORT || 3000;

app.listen(port, function() {
  console.log('Listening on port', port);
});

mongoose.connect('mongodb://localhost/healthwars');

// parse requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

//=========configure authentication=========/
var session = require('express-session');
var passport = require('passport');
require('../fbAuth.js')(passport);
app.use(session({
  secret: 'kenny',
  resave: false,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

//=========authentication route=========/
app.get('/auth/facebook', passport.authenticate('facebook'));
app.get('/auth/facebook/callback', passport.authenticate('facebook', {
  failureRedirect: "/"
}), function (req, res) {
  // passport attaches user information to all incoming requests
  if (!req.user.goal) {
    // if user has no goal, allow them to create one
    res.redirect('/#/overview');
  } else {
    // else log user in and redirect to goal status page
    res.redirect('/#/overview');
  }
});