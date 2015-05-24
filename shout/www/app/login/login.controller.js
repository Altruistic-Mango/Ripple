	angular
		.module('shout.login')
		.controller('LoginCtrl', LoginCtrl)

	function LoginCtrl($scope, $state, LocationFactory) {
		console.log('loginctrl instantiated!!!');
		$scope.login = function() {
			$state.go('tab.inbox');
		}
	}





