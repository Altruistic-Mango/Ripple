angular
  .module('shout.settings')
  .controller('SettingsCtrl', SettingsCtrl);

SettingsCtrl.$inject = ['$state', '$ionicHistory', 'SettingsFactory'];

function SettingsCtrl($state, $ionicHistory, SettingsFactory) {
  console.log('SettingsCtrl');

  var vm = this;

  vm.radius = 5; //initial value 5 miles
  vm.TTL = 5; //initial value 5 minutes
  vm.watch = true; 
  vm.acceptSettings = acceptSettings;
  vm.userSetWatch = userSetWatch; 

  function acceptSettings() {
    SettingsFactory.setSettings(parseInt(vm.radius), parseInt(vm.TTL)); 
    if ($ionicHistory.backView()) {
      $ionicHistory.goBack();
    } else {
      $state.go('tab.inbox');
    }
    console.log('radius set to: ', parseInt(vm.radius));
    console.log('TTL set to: ', parseInt(vm.TTL))
  }

  function userSetWatch() {
    SettingsFactory.setWatch(vm.watch);
  }

}
