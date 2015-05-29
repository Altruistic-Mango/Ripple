function Queue(timeLimit) {

  var _storage = [];

  this.insert = function(item) {

    _storage.push(item);
  };

  this.remove = function() {
    return _storage.shift();
  };

  this.cleanUp = function() {
    var time = new Date();
    if (time - _storage[0].timestamp > 60000) {
      return this.remove();
    }
  }

}







  module.exports = new Queue();