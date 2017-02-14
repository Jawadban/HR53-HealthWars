var mongoose = require('mongoose');
Schema = mongoose.Schema;

var starSchema = new mongoose.Schema({

  timestamp: { 
    type: Date, 
    default: Date.now,
  },
  color: {
    type: String, 
    default: '#333',
  },
  _userId: { 
    type: Schema.ObjectId, 
    ref: 'User' 
  },
  _roundId: { 
    type: Schema.ObjectId, 
    ref: 'Round' 
  }
  
});

module.exports = mongoose.model( 'Star', starSchema);