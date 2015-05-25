angular
  .module('shout.settings')
  .controller('SettingsCtrl', SettingsCtrl);

SettingsCtrl.$inject = ['$state', '$ionicHistory'];

function SettingsCtrl($state, $ionicHistory) {
  console.log('SettingsCtrl');

  var vm = this;

  vm.radius = 0; //TODO: determine an appropriate initial value
  vm.TTL = 0; //TODO: determine an appropriate initial value
  vm.watch = true; 
  vm.acceptSettings = acceptSettings;
  vm.userSetWatch = userSetWatch;

  function acceptSettings() {
    //do something with the settings, probably involving sending the information
    //to the settings factory
    //then go back to the last view
    if ($ionicHistory.backView()) {
      $state.go('tab.' + $ionicHistory.backTitle().toLowerCase());
    } else {
      $state.go('tab.inbox');
    }
  }

  function userSetWatch() {
    console.log('value of toggle: ', vm.watch);
  }
}
