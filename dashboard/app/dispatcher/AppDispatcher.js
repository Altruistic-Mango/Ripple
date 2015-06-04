var Dispatcher = require('flux').Dispatcher;
var AppDispatcher = new Dispatcher();

AppDispatcher.handleAction = function(action){
  console.log('app dispatcher handle Action called: ', action);
  this.dispatch({
    action: action
  });
};

module.exports = AppDispatcher;