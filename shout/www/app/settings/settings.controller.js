angular
  .module('shout.settings')
  .controller('SettingsCtrl', SettingsCtrl);

SettingsCtrl.$inject = ['$state', '$ionicHistory', 'SettingsFactory', 'CameraFactory', 's3Upload'];

function SettingsCtrl($state, $ionicHistory, CameraFactory, SettingsFactory, s3Upload) {
  console.log('SettingsCtrl');

  var vm = this;

  vm.radius = 5; //initial value 5 miles
  vm.TTL = 5; //initial value 5 minutes
  vm.watch = true; 
  vm.acceptSettings = acceptSettings;
  vm.sharePhoto = sharePhoto;
  vm.userSetWatch = userSetWatch; 

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
    var files = document.getElementById('photos').files;
    s3Upload.uploadFile(files);
  }
  

  function userSetWatch() {
    SettingsFactory.setWatch(vm.watch);
  }

}
