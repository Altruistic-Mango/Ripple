describe('Location Factory Unit Tests', function(){
    var LocationFactory, ionicPlatformMock, InboxFactoryMock, $localstorageMock;
    beforeEach(module('shout.location', function($provide) {
        ionicPlatformMock = jasmine.createSpyObj('ionicPlatform', ['ready']);
        InboxFactoryMock = jasmine.createSpyObj('InboxFactory', ['updateInbox']);
        $localstorageMock = jasmine.createSpyObj('$localstorage', ['get']);

        $provide.value('$ionicPlatform', ionicPlatformMock);
        $provide.value('$localstorage', $localstorageMock);
        $provide.value('InboxFactory', InboxFactoryMock);
    }));

    beforeEach(inject(function (_LocationFactory_) {
        LocationFactory = _LocationFactory_;
    }));

    it('can get an instance of my factory', inject(function(LocationFactory) {
        expect(LocationFactory).toBeDefined();
    }));

    // it('should have a function to get user position', function(){
    //     expect(LocationFactory.getPosition).toEqual(jasmine.any(Function));
    // });
});