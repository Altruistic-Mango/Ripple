angular
  .module('shout.signup')
  .controller('SignupCtrl', SignupCtrl);

SignupCtrl.$inject = ['$state'];

function SignupCtrl($state) {
  console.log('SignupCtrl');
  var vm = this;

  vm.login = login;
  
  function login() {
    $state.go('tab.inbox');
  }
}
