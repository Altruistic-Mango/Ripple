var React = require('react');
var PhotoActions = require('../actions/PhotoActions');

var PhotoEntry = React.createClass({
    handleClick: function() {
      PhotoActions.photoClicked(this.props);
    },  

    render: function () {
      if (this.props.photoId){
        return (
          <div onClick={this.handleClick}>
            <img className="photo" src={"https://s3-us-west-1.amazonaws.com/ripple-photos/s3Upload/"+ this.props.photoId + ".jpeg"}/>
          </div>
        );
      } else {
        return (
          <div className="text">
            <p> Select a photo to see its broadcast history </p>
          </div>
        );
      }
    }
  });

module.exports = PhotoEntry;
