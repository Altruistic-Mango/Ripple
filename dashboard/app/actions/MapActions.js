var AppDispatcher = require('../dispatcher/AppDispatcher');
var MapConstants = require('../constants/MapConstants');

var MapActions = {

  getData: function (data) {
    AppDispatcher.handleAction({
      actionType: MapConstants.GET_DATA,
      data: data
    });
  }

}

module.exports = MapActions; 