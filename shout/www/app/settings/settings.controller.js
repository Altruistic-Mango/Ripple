angular
  .module('shout.settings')
  .controller('SettingsCtrl', SettingsCtrl);

SettingsCtrl.$inject = ['$http', '$state', '$timeout', '$ionicHistory', 'ionicMaterialInk', 'SettingsFactory', '$localstorage', 'CameraFactory', 'LocationFactory', 's3', 'API_HOST', 'User'];

function SettingsCtrl($http, $state, $timeout, $ionicHistory, ionicMaterialInk, SettingsFactory, $localstorage, CameraFactory, LocationFactory, s3, API_HOST, User) {
  console.log('SettingsCtrl');

  //TODO: explanations of Enable, Trickle.
  //  Possibly with pop ups.
  var vm = this;

  vm.settings = User.settings();
  vm.toggleEnable = toggleEnable;
  vm.setTrickle = setTrickle;
  vm.saveSettings = saveSettings;
  vm.logOut = logOut;

  function saveSettings() {
    console.log(vm.settings);
    User.settings(vm.settings);
  }

  function toggleEnable() {
    User.settings(vm.settings.enabled);
  }

  function setTrickle() {
    User.settings(vm.settings.trickle);
  }

  function logOut() {
    User.isSignedIn(false);
    $timeout(function() {
      $state.go('login');
    },500);
  }

}
