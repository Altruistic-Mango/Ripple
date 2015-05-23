angular
	.module('shout.settings')
	.controller('SettingsCtrl', InboxCtrl);

function InboxCtrl($scope, $state) {
	console.log('settingsctrl instantiated!!!');
}