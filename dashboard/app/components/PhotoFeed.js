var React = require('react');
var PhotoActions = require('../actions/PhotoActions');
var PhotoStore = require('../stores/PhotoStore');
var PhotoConstants = require('../constants/PhotoConstants');
var PhotoEntry = require('./PhotoEntry');

var PhotoFeed = React.createClass({
    getInitialState: function () {
      return {
        photos: []
      };
    },

    componentWillMount: function() {
      console.log('PhotoFeed Mounted');
      PhotoActions.fetchPhotos();
      PhotoStore.addListener(PhotoConstants.FETCH_PHOTOS, this.loadPhotos);
    },

    loadPhotos: function(data) {
      console.log('load photos with: ', data);
      if (data.length) {
        this.setState({photos: data}, function(){
          console.log('set state with data: ', data);
        });
      }
    },

    render: function () {
      var photoItems = this.state.photos.map(function (photo, index) {
        return (
          <PhotoEntry key={index} photoId = {photo.photoId} />
        );
      });

      return (
        <div className="photos">
          PhotoFeed
          {photoItems}
        </div>
      );
    }

  });

module.exports = PhotoFeed;
