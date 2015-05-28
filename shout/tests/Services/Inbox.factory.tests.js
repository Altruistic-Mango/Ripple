describe('Inbox Factory Unit Tests', function(){
    var InboxFactory;
    beforeEach(module('shout.inbox'));

    beforeEach(inject(function (_InboxFactory_) {
        InboxFactory = _InboxFactory_;
    }));

    it('can get an instance of my factory', inject(function(InboxFactory) {
        expect(InboxFactory).toBeDefined();
    }));

    it('should have a an array of photos', function() {
        expect(InboxFactory.photos).toEqual(jasmine.any(Array));
    });

	it('should have a function that gets updated inbox from server', function() {
	    expect(InboxFactory.updateInbox).toEqual(jasmine.any(Function));
	});

    it('should update photos when when updateInbox is called', function(){
        InboxFactory.photos = [5,4,3,2,1];
        expect(InboxFactory.photos).toEqual([5,4,3,2,1])
        InboxFactory.updateInbox([1,2,3,4,5]);
        expect(InboxFactory.photos).toEqual([1,2,3,4,5])
    })


});



