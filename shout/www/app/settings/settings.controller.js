angular
  .module('shout.settings')
  .controller('SettingsCtrl', SettingsCtrl);

SettingsCtrl.$inject = ['$http', '$state', '$ionicHistory', 'SettingsFactory', '$localstorage', 'CameraFactory', 'LocationFactory', 's3', 'API_HOST'];

function SettingsCtrl($http, $state, $ionicHistory, SettingsFactory, $localstorage, CameraFactory, LocationFactory, s3, API_HOST) {
  console.log('SettingsCtrl');

  //TODO: explanations of Enable, Trickle.
  //  Possibly with pop ups.
  var vm = this;

  //TODO: load settings form localstorage initialize
  vm.radius = 5.0; //initial value 5 miles
  vm.TTL = 5.0; //initial value 5 minutes
  vm.watch = true;
  vm.trickle = true;
  vm.logOut = logOut;
  vm.saveSettings = saveSettings;
  vm.userSetWatch = userSetWatch;
  vm.sharePhoto = sharePhoto;

  //TODO: isSignedIn = false
  //TODO: remove localstorage of userId etc if need be
  function logOut() {
    $state.go('login');
  }

  //TODO: make settings object on user object in local storage
  //  user = {username: 'adsf',
  //          userId: 'asdf',
  //          isSignedIn: 'true',
  //          settings: {TTL, Radius, Enabled, Trickle}
  //          }
  //TODO: make sure TTL is in milliseconds
  function saveSettings() {
    SettingsFactory.setSettings(parseInt(vm.radius), parseInt(vm.TTL) );
    if ($ionicHistory.backView()) {
      $ionicHistory.goBack();
    } else {
      $state.go('tab.inbox');
    }
    console.log('radius set to: ', parseInt(vm.radius) );
    console.log('TTL set to: ', parseInt(vm.TTL ) );
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
