var React = require('react');
var PhotoFeed = require('./PhotoFeed');

var ExploreContent = React.createClass({
    render: function () {
      return (
        <div className="home">
          <PhotoFeed />
        </div>
      );
    }

  });

module.exports = ExploreContent;