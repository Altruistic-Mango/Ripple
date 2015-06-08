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
        <div className="search-text">
          Enter the ID of a Ripple
          <input type="text" id="ripple-search"></input>
          <div className="search-btn" onClick={this.handleClick}> Search </div>
        </div>
      );
    }

  });

module.exports = SearchComponent;