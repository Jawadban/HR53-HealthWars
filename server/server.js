var app = require('./route');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var request = require('request');
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
  //console.log('req.user after fb authentication', req.user);
  // passport attaches user information to all incoming requests
  if (!req.user.goal) {
    // if user has no goal, allow them to create one
    res.redirect('/#/overview');
  } else {
    // else log user in and redirect to goal status page
    res.redirect('/#/overview');
  }
  //send cookie
  token = req.user.facebook.token;
  //console.log('TOKEN WITHIN AUTH', token);
  //res.cookie('token', token);
  //res.redirect('/facebooklogin');
});

app.get('/facebooklogin', function (req, res){
  res.send('facebook login sucessful');
});


app.get('/logout', function (req, res) {
  // passport attaches logout method to all requests
  console.log('THIS IS BEING CALLED');
  req.logout();
});


app.get('/testing', isLoggedIn, function(req, res) {
  res.send('Authenticated');
})

//============ route middleware to make sure a user is logged in =============/
function isLoggedIn(req, res, next) {
    // if user is authenticated in the session, carry on
    if (req.isAuthenticated()) 
        return next();
    // if they aren't redirect them to the home page
    res.redirect('/auth/login');
}

