describe('Inbox Controller', function(){
    var scope, state, rootScope, InboxFactory, AlbumFactory, CameraFactoryMock, BroadcastFactoryMock, createController;

    // load the controller's module
    beforeEach(module('ui.router'));
    beforeEach(module('shout.inbox'));

    beforeEach(inject(function($injector) {
        CameraFactoryMock = jasmine.createSpyObj('CameraFactory', ['data', 'obj', 'takePicture', 'query']);
        BroadcastFactoryMock = jasmine.createSpyObj('BroadcastFactory', ['reBroadcast']);
        rootScope = $injector.get('$rootScope');
        scope = rootScope.$new();
        state = $injector.get('$state');
        InboxFactory = $injector.get('InboxFactory');
        AlbumFactory = $injector.get('AlbumFactory');
        var $controller = $injector.get('$controller');

        clearInbox = jasmine.createSpy(); 
        addPhotos = jasmine.createSpy();

        createController = function() {
            return $controller('InboxCtrl as vm', {
                $scope: scope, 
                $state: state,
                InboxFactory: InboxFactory,
                AlbumFactory: AlbumFactory,
                CameraFactory: CameraFactoryMock,
                BroadcastFactory: BroadcastFactoryMock
            });
        }

        createController(); 
    }))

    // tests start here
    it('should have an array of photos', function(){
        scope.vm.photos = InboxFactory.photos; 
        expect(scope.vm.photos).toEqual(jasmine.any(Array));
    });

    it('should call clearInbox when InboxFactory.photos updates', function(){
        InboxFactory.updateInbox([1,2,3,4,5]);
        expect(clearInbox).toHaveBeenCalled();
        expect(addPhotos).toHaveBeenCalled();

    })

});



