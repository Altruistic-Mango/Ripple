describe('Signup Controller', function(){
    var scope, state, rootScope, createController, $localstorageMock, SignupFactoryMock;

    // load the controller's module
    beforeEach(module('ui.router'));
    beforeEach(module('shout.signup'));

    beforeEach(inject(function($injector) {
        $localstorageMock = jasmine.createSpyObj('$localstorage', ['set']);
        SignupFactoryMock = jasmine.createSpyObj('SignupFactory', ['signupUser']);
        rootScope = $injector.get('$rootScope');
        scope = rootScope.$new();
        state = $injector.get('$state');
        var $controller = $injector.get('$controller');

        spyOn(state, 'go');

        createController = function() {
            return $controller('SignupCtrl as vm', {
                $scope: scope, 
                $state: state,
                SignupFactory: SignupFactoryMock,
                $localstorage: $localstorageMock
            });
        }

        createController(); 
    }))

    // tests start here
    it('should have a function called signup', function(){
        expect(scope.vm.signup).toEqual(jasmine.any(Function));
    });

    // it('$scope.login should trigger a state change', function(){
    //     scope.vm.signup(); 
    //     expect(state.go).toHaveBeenCalled();
    // });

    
});

