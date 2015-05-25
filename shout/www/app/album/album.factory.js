angular
  .module('shout.album')
  .factory('AlbumFactory', AlbumFactory);

function AlbumFactory() {
  var photos = [];
  var savePhoto = function() {
  };

  return {
    photos: photos,
    savePhoto: savePhoto
  };
}
