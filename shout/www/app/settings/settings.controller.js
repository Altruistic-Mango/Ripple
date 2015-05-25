angular
  .module('shout.settings')
  .controller('SettingsCtrl', InboxCtrl);

function InboxCtrl($scope, $state, $ionicHistory) {
  console.log('settingsctrl instantiated!!!');
  $scope.radius = 0; //TODO: determine an appropriate initial value
  $scope.TTL = 0; //TODO: determine an appropriate initial value
  $scope.polling = true; //TODO: determine an appropriate initial value

  $scope.acceptSettings = function() {
    //do something with the settings, probably involving sending the information
    //to the settings factory
    //then go back to the last view
    if ($ionicHistory.backView()) {
      $state.go('tab.' + $ionicHistory.backTitle().toLowerCase());
    } else {
      $state.go('tab.inbox');
    }
  };
}
