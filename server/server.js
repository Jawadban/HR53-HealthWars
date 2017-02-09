var app = require('./route');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var User = require('./dbmodules/users/userModel.js');




var port = 3000;

app.listen(port, function() {
  console.log('Listening on port', port);
});

mongoose.connect('mongodb://localhost/healthwars');