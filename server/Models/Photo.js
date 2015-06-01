var mongoose = require('mongoose');

var PhotoSchema = new mongoose.Schema({

  photoId: {
    type: String,
    required: true,
    unique: true
  },

  userId: {
    type: String,
    required: true,
    unique: false
  },

  radius: {
    type: Number,
    required: true,
    unique: false
  },

  TTL: {
    type: Number,
    required: true,
    unique: false
  },

  recipientList: {
    type: Array,
    required: false,
    unique: false
  },

  timestamp: {
    type: Number,
    required: true,
    unique: true 
  }

});

module.exports = mongoose.model('Photo', PhotoSchema);
