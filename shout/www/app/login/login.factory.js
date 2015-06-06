angular
  .module('shout.login')
  .factory('LoginFactory', LoginFactory);

LoginFactory.$inject = ['LocationFactory', 'InboxFactory', '$localstorage', '$http', 'API_HOST'];

function LoginFactory(LocationFactory, InboxFactory, $localstorage, $http, API_HOST) {
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
    var isSignedIn = $localstorage.get('isSignedIn');
    if (!isSignedIn) {
      $state.go('login');
    } else {
      var enabled = $localstorage.get('enabled');
      if (enabled) {
        LocationFactory.triggerPingInterval();
      }
    }



  //TODO: make user object in localstorage.
  // isSignedIn
  function successfulLogin(data) {
    var user = {
      username : data.username,
      userId : data.userId,
      isSignedIn : true, 
      settings : {}
    };

    $localstorage.setObject('user', user);
    InboxFactory.updateInbox(data.inbox);

    var enabled = $localstorage.get('enabled');
    if(enabled) {
      LocationFactory.triggerPingInterval();
      LocationFactory.getCurrentPosition(LocationFactory.getSuccessCallback, LocationFactory.errorCallback);
    }
    //LocationFactory.setWatch(LocationFactory.watchSuccessCallback, LocationFactory.errorCallback);
  }

}
