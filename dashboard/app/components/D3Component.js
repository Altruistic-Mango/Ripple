var React = require('react');
var d3Chart = require('./d3Chart');

var D3Component = React.createClass({
  // propTypes: {
  //   data: React.PropTypes.array
  // },
  
  componentDidMount: function() {
    var el = this.getDOMNode();
    d3Chart.create(el, {
      width: '600px',
      height: '600px'
    }, this.getChartState());
  },

  componentDidUpdate: function() {
    var el = this.getDOMNode();
    d3Chart.update(el, this.getChartState());
  },

  getChartState: function() {
    return {
      data: this.props.data
    };
  },

  // componentWillUnmount: function() {
  //   var el = this.getDOMNode();
  //   d3Chart.destroy(el);
  // },

  render: function() {
    return (
      <div className="Chart"> This is a D3 chart</div>
    );
  }

})

module.exports = D3Component; 
