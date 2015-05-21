var mongoose = require('mongoose');

var PhotoSchema = new mongoose.Schema({

  photoId: {
    type: Number,
    required: true,
    unique: true
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

  photoURL: {
    type: String,
    required: true,
    unique: true
  },

  recipientList: {
    type: Array,
    required: true,
    unique: false
  }

});

module.exports = mongoose.model('Photo', PhotoSchema);