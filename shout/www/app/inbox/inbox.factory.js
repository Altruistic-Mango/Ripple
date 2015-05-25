angular
  .module('shout.inbox')
  .factory('InboxFactory', InboxFactory);

function InboxFactory() {
  var photos = [];

  var checkForExpiredPhotos = function() {

  };

  var deleteExpiredPhotos = function() {

  };

  return {
    photos: photos,
    checkForExpiredPhotos: checkForExpiredPhotos,
    deleteExpiredPhotos: deleteExpiredPhotos
  };
}
