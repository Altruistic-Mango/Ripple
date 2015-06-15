angular
  .module('shout.tutorial')
  .factory('Tutorial', Tutorial);

Tutorial.$inject = [];

function Tutorial(){

  var services = {};

  services.testerTutorial = testerTutorial;

  return services;

  function testerTutorial() {
    console.log('in the Tester Tutorial');
  }

}
