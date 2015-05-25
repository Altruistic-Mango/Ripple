angular
  .module('shout.login')
  .controller('LoginCtrl', LoginCtrl);

LoginCtrl.$inject = ['$scope', '$state','LoginFactory'];

function LoginCtrl($scope, $state, LoginFactory) {
  console.log('LoginCtrl');
  $scope.login = function() {
    LoginFactory.successfulLogin(); 
    $state.go('tab.inbox');
  };
}
