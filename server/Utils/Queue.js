// The queue is responsible for removing nodes from the quadtree that have remained in the quadtree for more than one minute. The queue will 
// return any item that has expired, and checks the first item in the queue every one second. There are safeguards in place to keep the process
// from removing items from the quadtree that are not due to be removed, such as an exact timestamp check for an item being used to identify the
// correct node to be removed.

function Queue() {
	var _queue = [];

	var obj = {};

	obj.addToQueue = function(user) {
			_queue.push(user);
	};

	obj.removeFromQueue = function() {
		var timestamp = new Date().getTime();
		if (_queue.length && timestamp - _queue[0].timestamp > 60000) {
      console.log('Current time in ms = ' + timestamp + ' object timestamp = ' + _queue[0].timestamp + ' = ' + (timestamp - _queue[0].timestamp))
      console.log('Removing user ' + JSON.stringify(_queue[0]));
			return _queue.shift();
		}
    else return null;
	};

  return obj;
}

module.exports = new Queue();