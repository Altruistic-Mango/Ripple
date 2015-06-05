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

  //TODO: response message if username exists
  //TODO: form validation, no weird characters in username A-z0-9 only
  //TODO: if successful, go straight to inbox
  //TODO: store data in localstorage user object
  function signup() {
    console.log('vm.data: ', vm.data);
    SignupFactory.signupUser(vm.data)
      .success(function(res) {
        console.log('response from server on singup: ', res);

        user.initialize(res);

        $state.go('tab.inbox');
      })
      .error(function(res) {
        console.log('error on signup');
        vm.badUsername = true;
      });
  }

}
