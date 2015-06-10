angular
  .module('shout.signup')
  .controller('SignupCtrl', SignupCtrl);

SignupCtrl.$inject = ['$state', 'SignupFactory', '$ionicPopup', 'ionicMaterialInk', 'User'];

function SignupCtrl($state, SignupFactory, $ionicPopup, ionicMaterialInk, User) {
  console.log('SignupCtrl');
  var vm = this;
  vm.data = {};
  vm.data.username = '';
  vm.data.email = '';
  vm.data.password = '';
  vm.toggleSpinner = toggleSpinner;
  vm.badUsername = false;
  vm.spinner = false; 

  vm.signup = signup;
  vm.fbLogin = fbLogin;

  ionicMaterialInk.displayEffect();

  //TODO: response message if username exists
  //TODO: form validation, no weird characters in username A-z0-9 only
  //TODO: if successful, go straight to inbox
  //TODO: store data in localstorage user object
  function signup() {
    console.log('vm.data: ', vm.data);
    var usernameValidated = SignupFactory.validateUser(vm.data.username);
    if (usernameValidated) {
      vm.toggleSpinner();
      vm.data.username = vm.data.username.toLowerCase();
      SignupFactory.signupUser(vm.data)
        .success(function(res) {
          vm.toggleSpinner();
          console.log('response from server on singup: ', res);
          User.newUser(res);
          $state.go('tab.inbox');
        })
        .error(function(res) {
          vm.toggleSpinner();
          console.log('error on signup ' + res.errorCode);
          var errorCode = res.errorCode;
          $ionicPopup.alert({
          title: 'Username already exists',
          template: errorCode
        }); 
      });
    }
    else {
      $ionicPopup.alert({
        title: 'Invalid Username',
        template: 'Username must contain at least five alphanumeric characters.'
      });
    }
  }

  function toggleSpinner() {
    vm.spinner = !vm.spinner; 
  }

  function fbLogin() {
    if (User.fbId()) {
      var fbId = User.fbId();
      console.log('user is signed in');
      SignupFactory.loginFbUser({password: fbId})
        .success(function(res) {
          SignupFactory.successfulLogin(res);
          $state.go('tab.inbox');
        })
        .error(function(err) {
          User.isSignedIn(false);
          User.fbId(null);
          fbLogin();
        });
    }

    else if (!User.isSignedIn()) {
    console.log('user is not signed in');
    SignupFactory.fbLogin()
      .then(function(data) {
        SignupFactory.getUserInfo(data)
          .success(function(response, status, headers, config) {
            var username = response.first_name.toLowerCase();
            user = {username: username, password: response.id, email: response.email};
            SignupFactory.loginFbUser(user)
              .success(function(res) {
                User.newUser(res);
                User.fbId(res.password);
                SignupFactory.successfulLogin(res);
                $state.go('tab.inbox');
            });
          });
      });
    } 
  }
}
