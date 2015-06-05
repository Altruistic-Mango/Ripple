angular
  .module('shout.broadcast')
  .controller('BroadCastCtrl', BroadCastCtrl);

BroadCastCtrl.$inject = ['$http', '$state', '$ionicHistory', 'BroadCastFactory', 'SettingsFactory', '$localstorage', 'CameraFactory', 'LocationFactory', 's3', 'API_HOST'];

function BroadCastCtrl($http, $state, $ionicHistory, BroadCastFactory, SettingsFactory, $localstorage, CameraFactory, LocationFactory, s3, API_HOST) {
  console.log('BroadCastCtrl');

  var vm = this;

  //TODO: get values from localhost
  vm.radius = 5.0; //initial value 5 miles
  vm.TTL = 5.0; //initial value 5 minutes
  vm.watch = true;
  vm.trickle = true;
  vm.saveSettings = saveSettings;
  vm.userSetWatch = userSetWatch;
  vm.sharePhoto = sharePhoto;

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
    console.log('BroadCastCtrl.sharePhoto');
    var user = $localstorage.getObject('user');
    CameraFactory.getFile(function(file) {

      var photo = {};
      photo.timestamp = Date.now();
      photo.userId = user.userId;
      photo.photoId = photo.userId + photo.timestamp; 
      photo.TTL = vm.TTL;
      photo.radius = vm.radius;
      photo.trickle = vm.trickle;
      
      $localstorage.setObject('photo', photo);

      file.name = photo.photoId;
      s3.upload(file, function() {
        BroadCastFactory.newPhoto();
        $state.go('tab.inbox');
      });
    });
  }

  function userSetWatch() {
    SettingsFactory.setWatch(vm.watch);
  }

}
