var AppDispatcher = require('../dispatcher/AppDispatcher');
var PhotoConstants = require('../constants/PhotoConstants');
var objectAssign = require('react/lib/Object.assign');
var EventEmitter = require('events').EventEmitter;
var MapActions = require('../actions/MapActions');
var MapStore = require('../stores/MapStore');

var PhotoStore = objectAssign({}, EventEmitter.prototype, {
  addListener: function(eventName, callback) {
    this.on(eventName, callback);
  },

  removeDaListener: function(eventName, callback) {
    this.removeListener(eventName, callback);
  }

});

AppDispatcher.register(function (payload) {
  var actions = {};
  var action = payload.action; 

  actions[PhotoConstants.FETCH_PHOTOS] = function () {
    _fetchPhotos()
      .then(function(data) {
        PhotoStore.emit(PhotoConstants.FETCH_PHOTOS, data);
      });
  };

  actions[PhotoConstants.PHOTO_CLICKED] = function () {
    var photo = action.data;
    _fetchEvents(photo.photoId)
      .then(function(data) {
        MapActions.getData(data);
      });
  };

  actions[PhotoConstants.GET_NEW] = function () {
    var timestamp = action.data;
    _getNewPhotos(timestamp)
      .then(function(data) {
        PhotoStore.emit(PhotoConstants.GET_NEW, data);
      });

  }
  
  if (actions[action.actionType]){
    actions[action.actionType]();
  }

});

function _fetchPhotos () {
  return new Promise(function(resolve, reject) {
    $.get('/dashboard/photos', function(data) {
      resolve(data);
    });
  });
}

function _fetchEvents (photoId) {
  return new Promise(function(resolve, reject) {
    $.get('/dashboard/events/' + photoId, function(data) {
      resolve(data);
    })
  })
}

function _getNewPhotos (timestamp) {
  return new Promise(function(resolve, reject) {
    $.get('/dashboard/photos/' + timestamp, function(data) {
      resolve(data);
    });
  });
}

module.exports = PhotoStore; 