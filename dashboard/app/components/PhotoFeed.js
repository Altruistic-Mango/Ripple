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
      PhotoActions.fetchPhotos();
      PhotoStore.addListener(PhotoConstants.FETCH_PHOTOS, this.loadPhotos);
      PhotoStore.addListener(PhotoConstants.GET_NEW, this.loadPhotos)
    },

    componentDidMount: function() {
      this.setInterval(this.getNewPhotos, 60000); 
    },

    getNewPhotos: function() {
      if (this.state.photos.length){
        var topPhoto = this.state.photos[0];
        PhotoActions.newPhotos(topPhoto.timestamp);
      } else {
        PhotoActions.fetchPhotos();
      }
    },

    loadPhotos: function(data) {
      //TODO: make this DRY
      if (!this.state.photos.length){
        if (data.length) {
          this.setState({photos: data}, function(){
          });
        }
      } else {
        data = data.concat(this.state.photos);
        this.setState({photos: data}, function(){
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
        <div className="scroll">
          <div className="photos">
            {photoItems}
          </div>  
        </div>
      );
    }

  });

module.exports = PhotoFeed;
