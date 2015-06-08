var React = require('react');
var SearchActions = require('../actions/SearchActions');
var SearchStore = require('../stores/SearchStore');

var SearchComponent = React.createClass({
  
    handleClick: function() {
      var rippleId = $('#ripple-search').val();
      $('#ripple-search').val('');
      console.log('rippleId');
      SearchActions.searchEntered(rippleId);

    },

    render: function () {
      return (
        <div className="text">
          <h3>Enter the ID of a Ripple</h3>
          <input type="text" id="ripple-search"></input>
          <div className="search-btn" onClick={this.handleClick}> Search </div>
        </div>
      );
    }

  });

module.exports = SearchComponent;