angular
  .module('shout.broadcast')
  .controller('BroadCastCtrl', BroadCastCtrl);

BroadCastCtrl.$inject = ['$http', '$state', '$ionicHistory', 'BroadCastFactory', 'CameraFactory', 'LocationFactory', 's3', 'API_HOST', 'User'];

function BroadCastCtrl($http, $state, $ionicHistory, BroadCastFactory, CameraFactory, LocationFactory, s3, API_HOST, User) {
  console.log('BroadCastCtrl');

  var vm = this;

  vm.settings = User.settings();
  vm.saveSettings = saveSettings;
  vm.toggleEnable = toggleEnable;
  vm.sharePhoto = sharePhoto;

  function saveSettings() {
    User.settings(vm.settings);
  }

  function toggleEnable() {
    User.settings('enabled', vm.settings.enabled);
  }
  
  function setTrickle() {
    User.settings('trickle', vm.settings.trickle);
  }

  function sharePhoto() {
    console.log('BroadCastCtrl sharePhoto');
    BroadCastFactory.newPhoto(vm.settings);
  }

}
