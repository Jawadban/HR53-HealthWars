var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  facebook: {
    id: String,
    token: String,
    email: String,
    name: String
  },  

  name: {
    type: String
  },

  username: {
    type: String
  },

  password: {
    type: String
  },

  team: {
    type: String,
    required: false
  },

  isAdmin: {
    type: Boolean,
    default: false
  },

  scores: {
    type: [Number]
  },

  achievements: {
    type: [String]
  }

});

module.exports = mongoose.model( 'User', userSchema);