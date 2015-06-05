angular
  .module('shout.login')
  .factory('LoginFactory', LoginFactory);

LoginFactory.$inject = ['LocationFactory', 'InboxFactory', '$localstorage', '$http', 'API_HOST'];

function LoginFactory(LocationFactory, InboxFactory, $localstorage, $http, API_HOST) {
  console.log('LoginFactory');

  var services = {};
  services.successfulLogin = successfulLogin;
  services.loginUser = loginUser;

  return services;

  function loginUser(data) {
    return $http({
      method: 'POST',
      url: API_HOST + '/users/signin',
      data: data
    });
  }

  //TODO: make user object in localstorage.
  // isSignedIn
  function successfulLogin(data) {
    $localstorage.set('userId', data.userId);
    InboxFactory.updateInbox(data.inbox);
    LocationFactory.triggerPingInterval();
    LocationFactory.getCurrentPosition(LocationFactory.getSuccessCallback, LocationFactory.errorCallback);
    //LocationFactory.setWatch(LocationFactory.watchSuccessCallback, LocationFactory.errorCallback);
  }

}
