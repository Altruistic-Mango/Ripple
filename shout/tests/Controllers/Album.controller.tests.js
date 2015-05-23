describe('Album Controller', function(){
    var scope, state, rootScope, createController;

    // load the controller's module
    beforeEach(module('ui.router'));
    beforeEach(module('shout.album'));

    beforeEach(inject(function($injector) {
        rootScope = $injector.get('$rootScope');
        scope = rootScope.$new();
        state = $injector.get('$state');
        var $controller = $injector.get('$controller');

        spyOn(state, 'go');

        createController = function() {
            return $controller('AlbumCtrl', {
                $scope: scope, 
                $state: state
            });
        }

        createController(); 
    }))

    // tests start here
    it('should have an array of photos', function(){
        expect(scope.photos).toEqual(jasmine.any(Array));
    });

    
});

