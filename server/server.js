var app = require('./route');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var request = require('request');
var User = require('./dbmodules/users/userModel.js');
var usrSql = require('./dbmodules/users/userControllerSQL.js');
var mysql = require('mysql');

var port = process.env.PORT || 3000;

app.listen(port, function() {
  console.log('Listening on port', port);
});

mongoose.connect('mongodb://localhost/healthwars');

var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'healthwars'
});

connection.connect();

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

  token = req.user;
  res.cookie('token', token);

  if (!req.user.goal) {
    // if user has no goal, allow them to create one
    res.redirect('/#/');
  } else {
    // else log user in and redirect to goal status page
    res.redirect('/#/');
  }
});

app.get('/facebooklogin', function (req, res){
  res.send('facebook login sucessful');
});


app.get('/logout', function (req, res) {
  // passport attaches logout method to all requests
  console.log('The logout listener is working');
  req.logout();
  res.redirect('/');
});


app.get('/testing', isLoggedIn, function(req, res) {
  res.send('Authenticated');
});

app.post('/betting', function(req, res) {
  //console.log("curr: " + req.body.currUser);
  var challenger = req.body.currUser;
  var competitor = req.body.username;
  var winner = req.body.username;
  var loser;
  if(winner === challenger) loser = competitor;
  else loser = challenger;
  connection.query('SELECT stars.id FROM `stars` INNER JOIN `users` ON users.id = stars.id_users WHERE users.username = ?', [loser], function (error, results){
    console.log("challenger:"+  results);
    connection.query('SELECT * FROM `stars` INNER JOIN `users` ON users.id = stars.id_users WHERE users.username = ?', [competitor], function (error, res2){
      console.log("competitor: " + res2);
      res.send('Posted data!');
    });
  });
});

//============ route middleware to make sure a user is logged in =============/
function isLoggedIn(req, res, next) {
    // if user is authenticated in the session, carry on
    if (req.isAuthenticated()) 
        return next();
    // if they aren't redirect them to the home page
    res.send('This user is not logged in');
    //res.redirect('/');
}

