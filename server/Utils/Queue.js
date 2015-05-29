function Queue(timeLimit) {

  var _storage = [];

  this.insert = function(item) {

    _storage.push(item);
  };

  this.remove = function() {
    return _storage.shift();
  };

  this.listQueue = function() {
    return _storage;
  };

  this.cleanUp = function() {
    var time = new Date();
    if (_storage.length && time - _storage[0].timestamp > 60000) {
      return this.remove();
    }
  }

}







  module.exports = new Queue();