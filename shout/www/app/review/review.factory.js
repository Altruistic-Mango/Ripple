angular
  .module('shout.review')
  .factory('ReviewFactory', ReviewFactory);

function ReviewFactory() {
  console.log('ReviewFactory');
  var services = {};

  services.photo = {};
  services.sendPhoto = sendPhoto;

  return services;

  function sendPhoto() {
  }

}
