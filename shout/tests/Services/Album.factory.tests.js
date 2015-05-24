describe('Album Factory Unit Tests', function(){
    var AlbumFactory;
    beforeEach(module('shout.album'));

    beforeEach(inject(function (_AlbumFactory_) {
        AlbumFactory = _AlbumFactory_;
    }));

    it('can get an instance of my factory', inject(function(AlbumFactory) {
        expect(AlbumFactory).toBeDefined();
    }));

    it('should have a an array of photos', function() {
        expect(AlbumFactory.photos).toEqual(jasmine.any(Array));
    });

    it('should have a function that saves photos from the inbox', function() {
        expect(AlbumFactory.savePhoto).toEqual(jasmine.any(Function));
    })

});



