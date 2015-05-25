angular
  .module('shout.signup')
  .controller('SignupCtrl', SignupCtrl);

function SignupCtrl($scope, $state) {
  console.log('signupctrl instantiated!!!');
  $scope.login = function() {
    $state.go('tab.inbox');
  };
}
