describe('Inbox Factory Unit Tests', function(){
    var InboxFactory;
    beforeEach(module('shout.inbox'));

    beforeEach(inject(function (_InboxFactory_) {
        console.log(_InboxFactory_);
        InboxFactory = _InboxFactory_;
    }));

    it('can get an instance of my factory', inject(function(InboxFactory) {
        expect(InboxFactory).toBeDefined();
    }));

    it('should have a an array of photos', function() {
        expect(InboxFactory.photos).toEqual(jasmine.any(Array));
    });

		it('should have a function that checks the inbox for expired photos', function() {
		    expect(InboxFactory.checkForExpiredPhotos).toEqual(jasmine.any(Function));
		});

		it('should have a function that removes expired photos', function() {
		    expect(InboxFactory.deleteExpiredPhotos).toEqual(jasmine.any(Function));
		});

});



