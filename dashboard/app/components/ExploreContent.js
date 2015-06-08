var React = require('react');
var PhotoFeed = require('./PhotoFeed');

var ExploreContent = React.createClass({
    render: function () {
      return (
        <div className="home">
          <div className="recent-ripples">
            Recent Ripples
          </div> 
          <PhotoFeed />
        </div>
      );
    }

  });

module.exports = ExploreContent;