angular
  .module('shout.settings')
  .factory('SettingsFactory', SettingsFactory);

SettingsFactory.$inject = ['LocationFactory'];

function SettingsFactory(LocationFactory) {
  var services = {
    setSettings : setSettings,
    setWatch: setWatch
  }

  return services; 

  function setWatch(watch) {
    console.log('settings factory set watch called with watch: ', watch)
    if (!watch) {
      LocationFactory.clearWatch();
      LocationFactory.clearPingInterval(); 
    } else {
      LocationFactory.getCurrentPosition(LocationFactory.getSuccessCallback, LocationFactory.errorCallback);
      LocationFactory.setWatch(LocationFactory.watchSuccessCallback, LocationFactory.errorCallback)
      LocationFactory.triggerPingInterval(); 
    }
  }

  function setSettings(radius, TTL) {
    console.log('settings set in factory: ', TTL, radius);
  }
}