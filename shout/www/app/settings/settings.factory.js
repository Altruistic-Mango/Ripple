angular
  .module('shout.settings')
  .factory('SettingsFactory', SettingsFactory);

SettingsFactory.$inject = ['LocationFactory', 'InboxFactory', '$http', 'API_HOST', '$localstorage'];

function SettingsFactory(LocationFactory, InboxFactory, $http, API_HOST, $localstorage) {
  var radius = 5;
  var TTL = 5; //initial values
  var services = {};

  services.setSettings = setSettings;
  //services.emptyInbox = emptyInbox;
  services.setWatch = setWatch;
  services.radius = radius;
  services.TTL = TTL;
  
  return services;

  function setWatch(watch) {
    console.log('settings factory set watch called with watch: ', watch);
    if (!watch) {
      LocationFactory.clearPingInterval();
      services.emptyInbox(); 
    } else {
      LocationFactory.triggerPingInterval();
    }
  }

  function setSettings(userRadius, userTTL) {
    console.log('settings set in factory: ', TTL, radius);
    if (userRadius !== radius) {
      radius = userRadius;
    }
    if (userTTL !== TTL) {
      TTL = userTTL;
    }
  }

  // function emptyInbox() {
  //   var user = $localstorage.getObject('user');
  //   $http.get(API_HOST + '/users/deleteInbox/' + user.userId).success(function(data) {
  //       //InboxFactory.updateInbox(data);
  //     });
  // }

}
