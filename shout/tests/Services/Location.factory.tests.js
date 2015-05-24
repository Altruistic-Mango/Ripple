describe('Location Factory Unit Tests', function(){
    var LocationFactory, ionicPlatformMock;
    beforeEach(module('shout.location', function($provide) {
        ionicPlatformMock = jasmine.createSpyObj('ionicPlatform', ['ready']);
        $provide.value('$ionicPlatform', ionicPlatformMock);
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