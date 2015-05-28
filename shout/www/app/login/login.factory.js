angular
  .module('shout.login')
  .factory('LoginFactory', LoginFactory);

LoginFactory.$inject = ['LocationFactory', 'InboxFactory', '$localstorage', '$http'];

function LoginFactory(LocationFactory, InboxFactory, $localstorage, $http) {
  return {
    successfulLogin: successfulLogin,
    loginUser: loginUser
  }
  
  function loginUser (data) {
    return $http({
      method: 'POST',
      url: '/users/signin',
      data: data
    })
  }

  function successfulLogin (data) {
    console.log('login factory successfulLogin called')
    $localstorage.set('userId', data.userId);
    // InboxFactory.updateInbox(data.inbox)
    LocationFactory.getCurrentPosition(LocationFactory.getSuccessCallback, LocationFactory.errorCallback);
    LocationFactory.setWatch(LocationFactory.watchSuccessCallback, LocationFactory.errorCallback)
  }
  
}