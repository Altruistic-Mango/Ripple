angular
  .module('shout.inbox')
  .factory('InboxFactory', InboxFactory);

function InboxFactory() {
  console.log('InboxFactory');
  var services = {};

  services.photos = [];
  services.checkForExpiredPhotos = checkForExpiredPhotos;
  services.deleteExpiredPhotos = deleteExpiredPhotos;

  return services;

  function checkForExpiredPhotos() {
  }

  function deleteExpiredPhotos() {
  }

}
