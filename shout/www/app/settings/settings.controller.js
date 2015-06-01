angular
  .module('shout.settings')
  .controller('SettingsCtrl', SettingsCtrl);

SettingsCtrl.$inject = ['$http', '$state', '$ionicHistory', 'SettingsFactory', '$localstorage', 'CameraFactory', 'LocationFactory', 's3', 'API_HOST'];

function SettingsCtrl($http, $state, $ionicHistory, SettingsFactory, $localstorage, CameraFactory, LocationFactory, s3, API_HOST) {
  console.log('SettingsCtrl');

  var vm = this;

  vm.radius = 5; //initial value 5 miles
  vm.TTL = 5; //initial value 5 minutes
  vm.watch = true;
  vm.acceptSettings = acceptSettings;
  vm.userSetWatch = userSetWatch;
  vm.sharePhoto = sharePhoto;

  function acceptSettings() {
    SettingsFactory.setSettings(parseInt(vm.radius), parseInt(vm.TTL));
    if ($ionicHistory.backView()) {
      $ionicHistory.goBack();
    } else {
      $state.go('tab.inbox');
    }
    console.log('radius set to: ', parseInt(vm.radius));
    console.log('TTL set to: ', parseInt(vm.TTL));
  }

  function sharePhoto() {
    console.log('SettingsCtrl.sharePhoto');
    CameraFactory.getFile(function(file) {
      file.name = $localstorage.get('userId') + Date.now();
      s3.upload(file, function() {
        $state.go('tab.inbox');
      });
    });
  }

  function userSetWatch() {
    SettingsFactory.setWatch(vm.watch);
  }

}
