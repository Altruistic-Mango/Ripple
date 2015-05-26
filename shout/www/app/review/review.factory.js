angular
  .module('shout.review')
  .factory('ReviewFactory', ReviewFactory);

ReviewFactory.$inject = ['$state'];

function ReviewFactory($state) {
  console.log('ReviewFactory');
  var services = {};

  services.photo = {};
  services.sharePhoto = sharePhoto;

  return services;

  function sharePhoto() {
    $state.go('tab.settings');
  }

}
