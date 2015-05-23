angular
	.module('shout.album')
	.controller('AlbumCtrl', AlbumCtrl);

function AlbumCtrl($scope, $state) {
	console.log('albumctrl instantiated!!!');
	$scope.photos = []; 
}