var AppDispatcher = require('../dispatcher/AppDispatcher');
var PhotoConstants = require('../constants/PhotoConstants');
var objectAssign = require('react/lib/Object.assign');
var EventEmitter = require('events').EventEmitter;
var SearchConstants = require('../constants/SearchConstants');
var MapActions = require('../actions/MapActions');
var MapStore = require('../stores/MapStore');

var SearchStore = objectAssign({}, EventEmitter.prototype, {
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

  actions[SearchConstants.SEARCH_ENTERED] = function () {
    var photoId = action.data; 
    console.log('search entered heard in search store: ', photoId);
    _fetchEvents(photoId)
      .then(function(data) {
        MapActions.getData(data);
      })
  };
  
  if (actions[action.actionType]){
    actions[action.actionType]();
  }

});


module.exports = SearchStore; 

function _fetchEvents (photoId) {
  return new Promise(function(resolve, reject) {
    $.get('/dashboard/events/' + photoId, function(data) {
      resolve(data);
    })
  })
}