angular
  .module('shout.settings')
  .controller('SettingsCtrl', SettingsCtrl);

SettingsCtrl.$inject = ['$http', '$state', '$ionicHistory', 'SettingsFactory', '$localstorage', 'CameraFactory', 'LocationFactory', 's3', 'API_HOST', 'User'];

function SettingsCtrl($http, $state, $ionicHistory, SettingsFactory, $localstorage, CameraFactory, LocationFactory, s3, API_HOST, User) {
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
  vm.setTrickle = setTrickle;

  //TODO: isSignedIn = false
  //TODO: remove localstorage of userId etc if need be
  function logOut() {
    User.isSignedIn(false);
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
    var user = $localstorage.getObject('user');
    var userId = user.userId; 
    CameraFactory.getFile(function(file) {
      file.name = userId + Date.now();
      s3.upload(file, function() {
        $state.go('tab.inbox');
      });
    });
  }

  //TODO: make this someday
  function setTrickle() {
    console.log('setTrickle');
  }

  function userSetWatch() {
    SettingsFactory.setWatch(vm.watch);
  }

}
