var React = require('react');
var SearchComponent = require('./SearchComponent');

var SearchContent = React.createClass({
    render: function () {
      return (
        <div className="search">
          <SearchComponent />
        </div>
      );
    }

  });

module.exports = SearchContent;