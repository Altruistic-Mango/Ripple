angular
  .module('shout')
  .run(run);

run.$inject = ['$http', '$localstorage', '$rootScope', 'API_HOST'];

function run($http, $localstorage, $rootScope, API_HOST) {
  ionic.Platform.ready(function() {
    var user = $localstorage.get('user');

    //TODO: in login section, create this variable
    //if (user.isSignedIn) {
    //  $state.go('tab.inbox');
    //} else {
    //  $state.go('login');
   // }

    //hide keyboard accessory
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }

    // org.apache.cordova.statusbar required
    if (window.StatusBar) {
      StatusBar.styleLightContent();
    }

  });
}
