var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  
  uuId: {
    type: Number,
    required: true,
    unique: true
  },

  username: {
    type: String,
    required: true,
    unique: true
  },

  password: {
    type: String,
    required: true,
    unique: false
  },

  lat: {
    type: Number,
    required: false,
    unique: false
  },

  long: {
    type: Number,
    required: false,
    unique: false
  }

});

module.exports = mongoose.model('User', UserSchema);

