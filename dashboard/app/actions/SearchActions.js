var AppDispatcher = require('../dispatcher/AppDispatcher');
var SearchConstants = require('../constants/SearchConstants');

var SearchActions = {

  searchEntered: function (photoId) {
    AppDispatcher.handleAction({
      actionType: SearchConstants.SEARCH_ENTERED,
      data: photoId
    });
  }

}

module.exports = SearchActions; 