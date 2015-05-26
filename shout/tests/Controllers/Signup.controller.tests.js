describe('Signup Controller', function(){
    var scope, state, rootScope, createController;

    // load the controller's module
    beforeEach(module('ui.router'));
    beforeEach(module('shout.signup'));

    beforeEach(inject(function($injector) {
        rootScope = $injector.get('$rootScope');
        scope = rootScope.$new();
        state = $injector.get('$state');
        var $controller = $injector.get('$controller');

        spyOn(state, 'go');

        createController = function() {
            return $controller('SignupCtrl as vm', {
                $scope: scope, 
                $state: state
            });
        }

        createController(); 
    }))

    // tests start here
    it('should have a function called login', function(){
        expect(scope.vm.login).toEqual(jasmine.any(Function));
    });

    it('$scope.login should trigger a state change', function(){
        scope.vm.login(); 
        expect(state.go).toHaveBeenCalled();
    });

    
});

