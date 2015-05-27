var mongoose = require('mongoose');

var EventSchema = new mongoose.Schema({

  eventId: {
    type: Number,
    required: true,
    unique: true
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
    required: false,
    unique: false
  }

});

module.exports = mongoose.model('Event', EventSchema);


