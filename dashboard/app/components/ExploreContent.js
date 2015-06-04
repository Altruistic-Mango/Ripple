var React = require('react');
var PhotoFeed = require('./PhotoFeed');

var ExploreContent = React.createClass({
    render: function () {
      return (
        <div className="home">
          <h1>Explore Content</h1>
          <PhotoFeed />
        </div>
      );
    }

  });

module.exports = ExploreContent;