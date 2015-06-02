var React = require('react');

var PhotoEntry = React.createClass({
    handleClick: function() {
      PhotoActions.photoClicked(this.props);
    },  

    render: function () {
      return (
        <div onClick={this.handleClick}>
          <img className="photo" src={"https://s3-us-west-1.amazonaws.com/ripple-photos/s3Upload/"+ this.props.photoId + ".jpeg"}/>
        </div>
      );
    }
  });

module.exports = PhotoEntry;
