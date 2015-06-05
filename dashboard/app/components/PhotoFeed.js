var React = require('react');
var PhotoActions = require('../actions/PhotoActions');
var PhotoStore = require('../stores/PhotoStore');
var PhotoConstants = require('../constants/PhotoConstants');
var PhotoEntry = require('./PhotoEntry');
var SetIntervalMixin = require('../mixins/SetIntervalMixin');

var PhotoFeed = React.createClass({
    mixins: [SetIntervalMixin],

    getInitialState: function () {
      return {
        photos: []
      };
    },

    componentWillMount: function() {
      console.log('PhotoFeed Mounted');
      PhotoActions.fetchPhotos();
      PhotoStore.addListener(PhotoConstants.FETCH_PHOTOS, this.loadPhotos);
      PhotoStore.addListener(PhotoConstants.GET_NEW, this.loadPhotos)
    },

    componentDidMount: function() {
      this.setInterval(this.getNewPhotos, 10000); 
    },

    getNewPhotos: function() {
      console.log('getNewPhotos called');
      if (this.state.photos.length){
        var topPhoto = this.state.photos[0];
        console.log('top photo time: ', topPhoto.timestamp);
        PhotoActions.newPhotos(topPhoto.timestamp);
      } else {
        console.log('there werent any photos here so we fetch some');
        PhotoActions.fetchPhotos();
      }
    },

    loadPhotos: function(data) {
      console.log('load photos with: ', data);
      //TODO: make this DRY
      if (!this.state.photos.length){
        if (data.length) {
          this.setState({photos: data}, function(){
            console.log('set state with data: ', data);
          });
        }
      } else {
        data = data.concat(this.state.photos);
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
          Recent Ripples
          {photoItems}
        </div>
      );
    }

  });

module.exports = PhotoFeed;
