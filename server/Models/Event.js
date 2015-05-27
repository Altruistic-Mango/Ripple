var mongoose = require('mongoose');

var EventSchema = new mongoose.Schema({

  userId: {
    type: Number,
    required: true,
    unique: false
  },

  photoId: {
    type: Number,
    required: true,
    unique: false
  },

  TTL: {
    type: Number, 
    required: true,
    unique: false
  },

  radius: {
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

module.exports = mongoose.model('Event', EventSchema);


