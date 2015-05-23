describe('Camera Controller', function(){
    var scope, state, rootScope, createController;

    // load the controller's module
    beforeEach(module('ui.router'));
    beforeEach(module('shout.camera'));

    beforeEach(inject(function($injector) {
        rootScope = $injector.get('$rootScope');
        scope = rootScope.$new();
        state = $injector.get('$state');
        var $controller = $injector.get('$controller');

        spyOn(state, 'go');

        createController = function() {
            return $controller('CameraCtrl', {
                $scope: scope, 
                $state: state
            });
        }

        createController(); 
    }))
    
});

