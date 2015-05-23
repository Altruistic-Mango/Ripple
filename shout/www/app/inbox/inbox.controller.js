angular
	.module('shout.inbox')
	.controller('InboxCtrl', InboxCtrl);

function InboxCtrl($scope, $state, InboxFactory, AlbumFactory) {
	console.log('inboxctrl instantiated!!!');
	$scope.photos = InboxFactory.photos; 

	//when user clicks save on a photo call AlbumFactory.savePhoto(); 


}