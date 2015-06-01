angular
  .module('shout.localstorage')
  .factory('$localstorage', LocalStorageFactory);

LocalStorageFactory.$inject = ['$window'];

function LocalStorageFactory ($window) {
  var services = {};

  services.set = set;
  services.get = get;
  services.setObject = setObject;
  services.getObject = getObject;

  return services;

  function set(key, value) {
    $window.localStorage[key] = value;
  }

  function get(key, defaultValue) {
    return $window.localStorage[key] || defaultValue;
  }

  function setObject (key, value) {
      $window.localStorage[key] = JSON.stringify(value);
  }

  function getObject(key) {
      return JSON.parse($window.localStorage[key] || '{}');
  }

}
