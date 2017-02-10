var app = require('./route');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var request = require('request');
var User = require('./dbmodules/users/userModel.js');
var Keys = require('../keys.js');



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
// var token;
// console.log('token from auth', token);//undefined
app.get('/auth/facebook', passport.authenticate('facebook'));


app.get('/auth/facebook/callback', passport.authenticate('facebook', {
  failureRedirect: "/"
}), function (req, res) {
  console.log('req.user after fb authentication', req.user);
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
  console.log('TOKEN WITHIN AUTH', token);
  res.cookie('token', token);
  //res.redirect('/facebooklogin');
});

app.get('/facebooklogin', function (req, res){
  res.send('facebook login sucessful');
});


app.get('/logout', function (req, res) {
  // passport attaches logout method to all requests
  console.log('BLAAHHH req.body', req)
  User.findById(req.body._id, function(err, user) {
    console.log('USER HERE THERE EVERYWHERE', user);
  });
  res.redirect('/');
});

// var access_token;
// console.log('TOKEN HERE', token);
// app.get('/test', function (req, res, token) {
//   console.log('INSIDE OF APP.GET', token);
//   request('https://graph.facebook.com/oauth/access_token?&client_id=' + Keys.facebook.clientID + '&client_secret=' + Keys.facebook.clientSecret + '&grant_type=client_credentials', function(err, response, body) {
//     //console.log('THIS IS A RESPONSE  ', body);
//     access_token = body.slice(13);
//     console.log('access token', access_token);
//     console.log('token', token);//undefined
//     console.log('REQUEST from /test', req.body);
//     //User.findOne()
//     request('https://graph.facebook.com/debug_token?input_token=' + token + '&access_token=' + access_token, function (err, response, body) {
//     //console.log('RESPONSE from facebook', response);
//     console.log('BODY from facebook', body);
//     });
//   })
  
//   //https://graph.facebook.com/endpoint?key=value&amp;access_token=app_id|app_secret
//   /*'https://graph.facebook.com/oauth/access_token?&client_id=' + Keys.facebook.clientID + '&client_secret=' + Keys.facebook.clientSecret + '&grant_type=client_credentials'*/
// });

// //console.log('access token', access_token);
// app.get('/test2', function (req, res) {
//   request('https://graph.facebook.com/debug_token?input_token=' + token + '&access_token=' + access_token, function (err, response, body) {
//     //console.log('RESPONSE from facebook', response);
//     console.log('BODY from facebook', body);
//   });
// });
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

