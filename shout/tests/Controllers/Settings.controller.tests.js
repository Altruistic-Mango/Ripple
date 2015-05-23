describe('Settings Controller', function(){
    var scope, state, rootScope, ionicHistory, createController;

    // load the controller's module
    beforeEach(module('ui.router'));
    beforeEach(module('shout.settings'));

    beforeEach(inject(function($injector) {

        // Create $ionicHistory mock with `backTitle` method
        ionicHistoryMock = jasmine.createSpyObj('ionicHistory', ['backTitle', 'backView']);
        rootScope = $injector.get('$rootScope');
        scope = rootScope.$new();
        state = $injector.get('$state');

        var $controller = $injector.get('$controller');

        spyOn(state, 'go');

        createController = function() {
            return $controller('SettingsCtrl', {
                $scope: scope, 
                $state: state,
                $ionicHistory: ionicHistoryMock
            });
        }

        createController(); 
    }))

    // tests start here
    it('should have scope variables to hold radius, TTL, and whether location polling is on', function(){
        expect(scope.radius).toBeDefined();
        expect(scope.TTL).toBeDefined();
        expect(scope.polling).toBeDefined();
    });

    it('should have a function called acceptSettings', function(){
        expect(scope.acceptSettings).toEqual(jasmine.any(Function));
    });

    it('$scope.acceptSettings should trigger a state change', function(){
        scope.acceptSettings(); 
        expect(state.go).toHaveBeenCalled();
    });

    
});

