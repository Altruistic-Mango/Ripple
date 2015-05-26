describe('Settings Controller', function(){
    var scope, state, rootScope, ionicHistory, SettingsFactoryMock, createController;

    // load the controller's module
    beforeEach(module('ui.router'));
    beforeEach(module('shout.settings'));

    beforeEach(inject(function($injector) {

        // Create $ionicHistory mock with `backTitle` method
        ionicHistoryMock = jasmine.createSpyObj('ionicHistory', ['backTitle', 'backView', 'goBack']);
        SettingsFactoryMock = jasmine.createSpyObj('SettingsFactory', ['setSettings', 'setWatch']);
        rootScope = $injector.get('$rootScope');
        scope = rootScope.$new();
        state = $injector.get('$state');

        var $controller = $injector.get('$controller');

        spyOn(state, 'go');

        createController = function() {
            return $controller('SettingsCtrl as vm', {
                $scope: scope, 
                $state: state,
                $ionicHistory: ionicHistoryMock,
                SettingsFactory: SettingsFactoryMock
            });
        }

        createController(); 
    }))

    // tests start here
    it('should have scope variables to hold radius, TTL, and whether location polling is on', function(){
        expect(scope.vm.radius).toBeDefined();
        expect(scope.vm.TTL).toBeDefined();
        expect(scope.vm.watch).toBeDefined();
    });

    it('should have a function called acceptSettings', function(){
        expect(scope.vm.acceptSettings).toEqual(jasmine.any(Function));
    });

    it('$scope.acceptSettings should trigger a state change', function(){
        scope.vm.acceptSettings(); 
        expect(state.go).toHaveBeenCalled();
    });

    
});

