angular
  .module('shout.login')
  .controller('LoginCtrl', LoginCtrl);

LoginCtrl.$inject = ['$state', 'LoginFactory', 'ionicMaterialInk', '$ionicPopup', 'User'];

function LoginCtrl($state, LoginFactory, ionicMaterialInk, $ionicPopup, User) {
  console.log('LoginCtrl');
  ionicMaterialInk.displayEffect({'duration':2000});

  var vm = this;

  vm.data = {
    username: '',
    email: '',
    password: ''
  };

  vm.login = login;
  vm.fbLogin = fbLogin;
  vm.toggleSpinner = toggleSpinner; 
  vm.spinner = false; 


  //TODO:Form validation for all required fields
  //TODO: username exists, password incorrect
  //TODO: no username error
  //TODO: facebook auth
  function login() {
    if (!vm.data.username) {
      $ionicPopup.alert({
        title: 'No username entered',
        template: 'Please enter a username'
      });
    } else {
      vm.toggleSpinner();
      vm.data.username = vm.data.username.toLowerCase();
      LoginFactory.loginUser(vm.data)
      .success(function(data){
        vm.toggleSpinner();
        LoginFactory.successfulLogin(data);
      })
        .error(function(res) {
          vm.toggleSpinner();
          console.log('loginUser error');
          var errorCode = res.errorCode;
          $ionicPopup.alert({
            title: 'Login Error - ' + errorCode + ' incorrect',
            template: 'Please re-enter ' + errorCode
          });
        });
    }
  }

  function toggleSpinner(){
    vm.spinner = !vm.spinner; 
  }

  function fbLogin() {
    if (User.fbId()) {
      var fbId = User.fbId();
      console.log('user is signed in');
      LoginFactory.loginFbUser({
          password: fbId
        })
        .success(function(res) {
          LoginFactory.successfulLogin(res);
          $state.go('tab.inbox');
        })
        .error(function(err) {
          User.isSignedIn(false);
          User.fbId(null);
          fbLogin();
        });
    } else if (!User.isSignedIn()) {
      console.log('user is not signed in');
      LoginFactory.fbLogin()
        .then(function(data) {
          LoginFactory.getUserInfo(data)
            .success(function(response, status, headers, config) {
              var username = response.first_name.toLowerCase();
              user = {
                username: username,
                password: response.id,
                email: response.email
              };
              LoginFactory.loginFbUser(user)
                .success(function(res) {
                  User.newUser(res);
                  User.fbId(res.password);
                  LoginFactory.successfulLogin(res);
                  $state.go('tab.inbox');
                });
            });
        });
    }
  }
}
