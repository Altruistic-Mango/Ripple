angular
  .module('shout.signup')
  .controller('SignupCtrl', SignupCtrl);

SignupCtrl.$inject = ['$state', 'SignupFactory'];

function SignupCtrl($state, SignupFactory) {
  console.log('SignupCtrl');
  var vm = this;
  vm.data = {};
  vm.data.username = '';
  vm.data.email = '';
  vm.data.password = '';
  vm.badUsername = false;

  vm.signup = signup;

  function signup() {
    console.log('vm.data: ', vm.data);
    SignupFactory.signupUser(vm.data)
      .success(function(res) {
        console.log('response from server on singup: ', res);
        $state.go('login');
      })
      .error(function(res) {
        console.log('error on signup');
        vm.badUsername = true;
      });
  }

}
