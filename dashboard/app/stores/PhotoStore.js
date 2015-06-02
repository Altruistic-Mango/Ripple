var AppDispatcher = require('../dispatcher/AppDispatcher');
var PhotoConstants = require('../constants/PhotoConstants');
var objectAssign = require('react/lib/Object.assign');
var EventEmitter = require('events').EventEmitter;
var D3Actions = require('../actions/D3Actions');
var D3Store = require('../stores/D3Store');

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
    console.log('fetch photos dispatch heard in store');
    _fetchPhotos()
      .then(function(data) {
        console.log('fetched: ', data);
        PhotoStore.emit(PhotoConstants.FETCH_PHOTOS, data);
      });
  };

  actions[PhotoConstants.PHOTO_CLICKED] = function () {
    var photo = action.data;
    console.log('photo clicked dispatch heard in store: ', action.data);
    _fetchEvents(photo.photoId)
      .then(function(data) {
        console.log('events: ', data);
        D3Actions.getData(data);
      });
  }
  
  if (actions[action.actionType]){
    actions[action.actionType]();
  }

});

function _fetchPhotos () {
  console.log('fetch photos called');
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

module.exports = PhotoStore; 