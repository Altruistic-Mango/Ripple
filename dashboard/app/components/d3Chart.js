var d3 = require('d3');
var usJSON = require('../res/us');

// var usStates = JSON.parse(usJSON);

var d3Chart = {};

d3Chart.create = function(el, props, state) {
  console.log('d3Chart.create with: ', state);
  var svg = d3.select(el).append('svg')
      .attr('class', 'd3')
      .attr('width', props.width)
      .attr('height', props.height);

  // create the map
  var path = d3.geo.path();
    svg.selectAll('path')
       .data(usJSON.features)
       .enter()
       .append('path')
       .attr('d', path)
       .attr('stroke', '#FFFFFF')
       .attr('stroke-width', .5)
       .attr('fill', '#132A50');

  var events = d3.select(el).select('svg').append('g')
      .attr('id', 'events');

  if (state.data) {
    this.update(el, state);
  }     
};

//state is the geoJSON
d3Chart.update = function(el, state) {
  this._drawPoints(el, state);
};

d3Chart.destroy = function(el) {
  // Any clean-up would go here
  // in this example there is nothing to do
};

d3Chart._drawPoints = function(el, data) {
  console.log('_drawPoints: ', data.data);

  var path = d3.geo.path();

  circles = d3.select(el).select('svg').select('g').selectAll('path')
    .data(data.data.features);

  circles
    .enter()
    .append('path')
    .attr('class', 'geo-node')
    .attr('d', path);

  circles
    .exit()
    .remove();  
};


module.exports = d3Chart; 

 
