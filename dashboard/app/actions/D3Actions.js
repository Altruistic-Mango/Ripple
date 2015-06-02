var AppDispatcher = require('../dispatcher/AppDispatcher');
var D3Constants = require('../constants/D3Constants');

var D3Actions = {

  getData: function (data) {
    AppDispatcher.handleAction({
      actionType: D3Constants.GET_DATA,
      data: data
    });
  }

}

module.exports = D3Actions; 