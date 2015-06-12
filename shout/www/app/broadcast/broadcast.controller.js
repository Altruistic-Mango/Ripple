angular
  .module('shout.broadcast')
  .controller('BroadCastCtrl', BroadCastCtrl);

BroadCastCtrl.$inject = ['$http', '$state', '$ionicHistory', 'BroadCastFactory', 'CameraFactory', 'LocationFactory', 's3', 'API_HOST', 'User'];

function BroadCastCtrl($http, $state, $ionicHistory, BroadCastFactory, CameraFactory, LocationFactory, s3, API_HOST, User) {
  console.log('BroadCastCtrl');

  var vm = this;

  vm.settings = User.settings();
  vm.goBack = goBack;
  vm.goInbox = goInbox;
  vm.saveSettings = saveSettings;
  vm.toggleEnable = toggleEnable;
  vm.toggleSpinner = toggleSpinner;
  vm.sharePhoto = sharePhoto;
  vm.spinner = false;

  function goBack() {
    $state.go('review');
  }

  function goInbox() {
    $state.go('tab.inbox');
  }

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
    vm.toggleSpinner();
    console.log('BroadCastCtrl sharePhoto');
    BroadCastFactory.newPhoto(vm.settings, function() {
      User.caption('');//clear caption
      vm.toggleSpinner();
      $state.go('tab.inbox');
    });
  }

  function toggleSpinner(){
    vm.spinner = !vm.spinner;
  }

}
