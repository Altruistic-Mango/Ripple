angular
  .module('shout.signup')
  .controller('SignupCtrl', SignupCtrl);

SignupCtrl.$inject = ['$state', 'SignupFactory', '$ionicPopup'];

function SignupCtrl($state, SignupFactory, $ionicPopup) {
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
    var usernameValidated = SignupFactory.validateUser(vm.data.username);
    if (usernameValidated) {
      vm.data.username = vm.data.username.toLowerCase();
      SignupFactory.signupUser(vm.data)
        .success(function(res) {
          console.log('response from server on singup: ', res);
          user.initialize(res);
          $state.go('tab.inbox');
        })
        .error(function(res) {
          console.log('error on signup ' + res.errorCode);
          var errorCode = res.errorCode;
          $ionicPopup.alert({
          title: 'Username already exists',
          template: errorCode
        })
      })
    }
    else {
      $ionicPopup.alert({
        title: 'Invalid Username',
        template: 'Username must contain at least five alphanumeric characters.'
      })
    }
  }

}
