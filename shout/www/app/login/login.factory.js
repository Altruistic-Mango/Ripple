angular
  .module('shout.login')
  .factory('LoginFactory', LoginFactory);


LoginFactory.$inject = ['$state', 'LocationFactory', 'InboxFactory', '$localstorage', '$http', 'API_HOST', '$cordovaOauth', 'User', '$q'];

function LoginFactory($state, LocationFactory, InboxFactory, $localstorage, $http, API_HOST, $cordovaOauth, User, $q) {
  console.log('LoginFactory');

  var services = {};

  services.loginUser = loginUser;
  services.checkLogin = checkLogin;
  services.successfulLogin = successfulLogin;
  services.fbLogin = fbLogin;
  services.getUserInfo = getUserInfo;
  services.loginFbUser = loginFbUser;

  return services;


  function loginUser(data) {
    return $http({
        method: 'POST',
        url: API_HOST + '/users/signin',
        data: data
      })
  }


  function successfulLogin(data) {
    console.log('successfulLogin', data);

    User.saveUser(data);
    User.isSignedIn(true);

    if (User.settings().enabled) {
      LocationFactory.triggerPingInterval();
    }

    $state.go('tab.inbox');
  }


  function checkLogin() {
    console.log('LoginFactory checkLogin');
    if (!User.isSignedIn()) {
      $state.go('login');
    } else {
      var settings = User.settings();
      console.log(settings);
      if (settings.enabled) {
        LocationFactory.triggerPingInterval();
      }
    }
  }


  function getFBToken(callback) {
    $http.get(API_HOST + '/api/fbToken')
      .success(function(response) {
        callback(response);
      });
  }


  function fbLogin() {
    return $q(function(resolve, reject) {
        getFBToken(function(accessID) {
        $cordovaOauth.facebook(accessID, ["email"])
          .then(function(result) {
            if (result) resolve(result);
            else reject({});
          });
      }, function(error) {
        console.log(error);
        });
    });
  }

  function loginFbUser(data) {
    return $http({
      method: 'POST',
      url: API_HOST + '/users/fbSignin',
      data: data
    });
  }


  function getUserInfo(accessToken) {
    console.log(accessToken);
    var url = 'https://graph.facebook.com/me?access_token=' + accessToken.access_token;
    return $http.get(url);
  }

}
