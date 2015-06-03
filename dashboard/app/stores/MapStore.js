var AppDispatcher = require('../dispatcher/AppDispatcher');
var MapConstants = require('../constants/MapConstants');
var objectAssign = require('react/lib/Object.assign');
var EventEmitter = require('events').EventEmitter;
var MapActions = require('../actions/MapActions');

var MapStore = objectAssign({}, EventEmitter.prototype, {
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

  actions[MapConstants.GET_DATA] = function () {
   var geoJSONObj = _geoJSON(action.data);
   MapStore.emit(MapConstants.GET_DATA, geoJSONObj);
  };
  
  if (actions[action.actionType]){
    actions[action.actionType]();
  };

});


module.exports = MapStore; 

function _geoJSON (data) {
  var geoJSON = {
    'type' : 'FeatureCollection',
    'features' : []
  };

  var feature = {
    'type' : 'Feature',
    'geometry' : {
      'type' : 'multipoint',
      'coordinates' : []
    }
  };

  data.forEach(function(event) {
    geoJSON.features.push({
      'type' : 'Feature',
      'geometry' : {
        'type' : 'Point',
        'coordinates' : [event.x, event.y]
      }
    });

    feature.geometry.coordinates.push([event.x, event.y]);
  });

  return {
          events: geoJSON,
          feature: feature
         }
}
