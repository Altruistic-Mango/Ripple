function Queue() {
	var _queue = [];

	var obj = {};

	obj.addToQueue = function(user) {
			_queue.push(user);
	};

	obj.removeFromQueue = function() {
		var timestamp = new Date().getTime();
		if (_queue.length && timestamp - _queue[0].timestamp > 90000) {
      console.log('Current time in ms = ' + timestamp + ' object timestamp = ' + _queue[0].timestamp + ' = ' + (timestamp - _queue[0].timestamp))
      console.log('Removing user ' + JSON.stringify(_queue[0]));
			return _queue.shift();
		}
    else return null;
	};

  return obj;
}

module.exports = new Queue();