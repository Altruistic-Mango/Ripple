angular
  .module('shout.login')
  .controller('LoginCtrl', LoginCtrl);

LoginCtrl.$inject = ['$scope', '$state', 'LocationFactory'];

function LoginCtrl($scope, $state, LocationFactory) {
  console.log('LoginCtrl');
  $scope.login = function() {
    $state.go('tab.inbox');
  };
}
