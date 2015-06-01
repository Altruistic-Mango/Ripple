var bevent = require('../Controllers/eventController');


var genRndLat = function(){
  var genLat = JSON.stringify(Math.random()*(122.510728 - 122.387475) + 122.387475 * -1);
  return genLat.slice(0, 11);
}
//generates random Long in SF
var genRndLong = function(){
  var genLong = JSON.stringify(Math.random()*(37.808712 - 37.709369) + 37.709369);
  return genLong.slice(0, 9);
} 