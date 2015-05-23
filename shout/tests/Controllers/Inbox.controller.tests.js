describe('Inbox Controller', function(){
    var scope, state, rootScope, InboxFactory, AlbumFactory, createController;

    // load the controller's module
    beforeEach(module('ui.router'));
    beforeEach(module('shout.inbox'));

    beforeEach(inject(function($injector) {
        rootScope = $injector.get('$rootScope');
        scope = rootScope.$new();
        state = $injector.get('$state');
        InboxFactory = $injector.get('InboxFactory');
        AlbumFactory = $injector.get('AlbumFactory');
        var $controller = $injector.get('$controller');

        spyOn(state, 'go');

        createController = function() {
            return $controller('InboxCtrl', {
                $scope: scope, 
                $state: state,
                InboxFactory: InboxFactory,
                AlbumFactory: AlbumFactory
            });
        }

        createController(); 
    }))

    // tests start here
    it('should have an array of photos', function(){
        expect(scope.photos).toEqual(jasmine.any(Array));
    });

});

