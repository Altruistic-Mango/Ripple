angular
  .module('shout.login')
  .factory('LoginFactory', LoginFactory);

<<<<<<< HEAD
LoginFactory.$inject = ['LocationFactory', 'InboxFactory', '$localstorage', '$http', 'API_HOST'];

function LoginFactory(LocationFactory, InboxFactory, $localstorage, $http, API_HOST) {
=======
LoginFactory.$inject = ['LocationFactory', 'InboxFactory', '$localstorage', '$http', 'API_HOST', '$cordovaOauth', 'User'];

function LoginFactory(LocationFactory, InboxFactory, $localstorage, $http, API_HOST, $cordovaOauth, User) {
>>>>>>> Refactoring client controllers
  console.log('LoginFactory');

  var services = {};
  services.loginUser = loginUser;
  services.checkLogin = checkLogin;
  services.successfulLogin = successfulLogin;

  return services;

  function loginUser(data) {
    return $http({
      method: 'POST',
      url: API_HOST + '/users/signin',
      data: data
    });
  }

  function checkLogin() {
    if (!User.isSignedIn()) {
      $state.go('login');
    } else {
      var settings = User.settings()
      console.log(settings);
      if (settings.enabled) {
        LocationFactory.triggerPingInterval();
      }
    }
  }



  //TODO: make user object in localstorage.
  // isSignedIn
  function successfulLogin(data) {
    User.userId(data.userId);
    InboxFactory.updateInbox(data.inbox);

    var settings = User.settings()
    console.log(settings);
    if (settings.enabled) {
      LocationFactory.triggerPingInterval();
      LocationFactory.getCurrentPosition(LocationFactory.getSuccessCallback, LocationFactory.errorCallback);
    }
    //LocationFactory.setWatch(LocationFactory.watchSuccessCallback, LocationFactory.errorCallback);
  }

  function getFBToken(callback) {
    $http.get(API_HOST + '/api/fbToken')
      .success(function(response) {
        callback(response);
      });
  }

  function fbLogin() {
    getFBToken(function(accessID) {
      console.log(accessID + (typeof accessID));
    $cordovaOauth.facebook(accessID, ["email"]).then(function(result) {
      console.log(result);
    }, function(error) {
      console.log(error);
      });
    });
  }

}
