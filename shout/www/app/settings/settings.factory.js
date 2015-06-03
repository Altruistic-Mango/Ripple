angular
  .module('shout.settings')
  .factory('SettingsFactory', SettingsFactory);

SettingsFactory.$inject = ['LocationFactory'];

function SettingsFactory(LocationFactory) {
  var radius = 5;
  var TTL = 5; //initial values
  var services = {};

  services.setSettings = setSettings;
  services.setWatch = setWatch;
  services.radius = radius;
  services.TTL = TTL;
  
  return services;

  //TODO: set to local storage
  function setWatch(watch) {
    console.log('settings factory set watch called with watch: ', watch);
    if (!watch) {
      LocationFactory.clearWatch();
      LocationFactory.clearPingInterval();
    } else {
      LocationFactory.getCurrentPosition(LocationFactory.getSuccessCallback, LocationFactory.errorCallback);
      LocationFactory.setWatch(LocationFactory.watchSuccessCallback, LocationFactory.errorCallback);
      LocationFactory.triggerPingInterval();
    }
  }

  //TODO:  save to local storage
  function setSettings(userRadius, userTTL) {
    console.log('settings set in factory: ', TTL, radius);
    if (userRadius !== radius) {
      radius = userRadius;
    }
    if (userTTL !== TTL) {
      TTL = userTTL;
    }
  }

}
