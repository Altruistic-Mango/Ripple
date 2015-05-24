describe('Login Controller', function(){
    var scope, state, rootScope, createController;

    // load the controller's module
    beforeEach(module('ui.router'));
    beforeEach(module('shout.login'));
    //TODO: add the LocationFactory dependency so these tests pass again
    beforeEach(inject(function($injector) {
        rootScope = $injector.get('$rootScope');
        scope = rootScope.$new();
        state = $injector.get('$state');
        var $controller = $injector.get('$controller');

        spyOn(state, 'go');

        createController = function() {
            return $controller('LoginCtrl', {
                $scope: scope, 
                $state: state
            });
        }

        createController(); 
    }))

    // tests start here
    it('should have a function called login', function(){
        expect(scope.login).toEqual(jasmine.any(Function));
    });

    it('$scope.login should trigger a state change', function(){
        scope.login(); 
        expect(state.go).toHaveBeenCalled();
    });

    
});

