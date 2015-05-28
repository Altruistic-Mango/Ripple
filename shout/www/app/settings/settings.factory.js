angular
  .module('shout.settings')
  .factory('SettingsFactory', SettingsFactory);

SettingsFactory.$inject = ['LocationFactory'];

function SettingsFactory(LocationFactory) {
  var radius = 5,
      TTL = 5; //initial values 
  var services = {
    setSettings : setSettings,
    setWatch: setWatch,
    radius: radius,
    TTL: TTL
  };

  return services; 

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

  function setSettings(userRadius, userTTL) {
    console.log('settings set in factory: ', TTL, radius);
    if (userRadius !== radius){
      radius = userRadius; 
    }
    if (userTTL !== TTL ){
      TTL = userTTL; 
    }
  }

}
