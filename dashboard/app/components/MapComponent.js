var React = require('react');
var Map = require('./Map');

var MapComponent = React.createClass({
  // propTypes: {
  //   data: React.PropTypes.array
  // },
  
  componentDidMount: function() {
    var el = this.getDOMNode();
    console.log('component mounted: ', el);
    Map.create(el, {
      width: '600px',
      height: '600px'
    }, this.getChartState());
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

  // componentWillUnmount: function() {
  //   var el = this.getDOMNode();
  //   Map.destroy(el);
  // },

  render: function() {
    return (
      <div className="Chart"> </div>
    );
  }

})

module.exports = MapComponent; 
