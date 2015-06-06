var AppDispatcher = require('../dispatcher/AppDispatcher');
var PhotoConstants = require('../constants/PhotoConstants');

var PhotoActions = {

  photoClicked: function (photo) {
    AppDispatcher.handleAction({
      actionType: PhotoConstants.PHOTO_CLICKED,
      data: photo
    });
  },

  fetchPhotos: function (data) {
    console.log('photoactions.fetchPhotos called');
    AppDispatcher.handleAction({
      actionType: PhotoConstants.FETCH_PHOTOS,
      data: data
    });
  },

  newPhotos: function (timestamp) {
    AppDispatcher.handleAction({
      actionType: PhotoConstants.GET_NEW,
      data: timestamp
    })
  }

}

module.exports = PhotoActions; 
