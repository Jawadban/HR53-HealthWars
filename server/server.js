var app = require('./route');
var mongoose = require('mongoose');

var port = process.env.PORT || 3000;

app.listen(port, function() {
  console.log('Listening on port', port);
});

mongoose.connect('mongodb://localhost/healthwars');