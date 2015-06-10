var React = require('react');
var Map = require('./Map');

var MapComponent = React.createClass({
  componentDidMount: function() {
    var el = this.getDOMNode();
    Map.create(el);
  },

  shouldComponentUpdate: function(nextProps) {
    if (nextProps.data.photoId != this.props.data.photoId) {
      //if the incoming props' photoId is different 
      return true; 
    } else if (nextProps.data.broadcasts != this.props.data.broadcasts){
      //if the incoming props' photoId is the same, but the number of broadcasts has changed 
      return true;
    }
    return false; 
  },

  componentDidUpdate: function() {
    var el = this.getDOMNode();
    Map.update(el, this.getChartState());
  },

  getChartState: function() {
    return {
      data: this.props.data
    };
  },


  render: function() {
    return (
      <div className="Chart"> </div>
    );
  }

})

module.exports = MapComponent; 
