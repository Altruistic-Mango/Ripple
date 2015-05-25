angular
  .module('shout.album')
  .factory('AlbumFactory', AlbumFactory);

function AlbumFactory() {
  console.log('AlbumFactory');
  var services = {};

  services.photos = [];
  services.savePhoto = savePhoto;

  return services;

  function savePhoto() {
  }

}
