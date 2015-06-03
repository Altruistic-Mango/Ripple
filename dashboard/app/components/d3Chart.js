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

  var projection = d3.geo.albersUsa();
  // create the map
  var path = d3.geo.path()
                .projection(projection);

    var zoom = d3.behavior.zoom()
        .scale(projection.scale())
        .scaleExtent([1, 10])
        .on("zoom", zoomed);            

    svg.call(zoom)
       .on('dblclick.zoom', null);            

    var states = svg.append('g')
                    .attr('id', 'states');
       
    states.selectAll('path')
       .data(usJSON.features)
       .enter()
       .append('path')
       .attr('d', path)
       .attr('stroke', '#FFFFFF')
       .attr('stroke-width', .5)
       .attr('fill', '#132A50');

  var events = d3.select(el).select('svg').append('g')
      .attr('id', 'events');

/////////////
function zoomed() {
  states.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
}





///////////////
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
  var dataObj = data.data; 
  var path = d3.geo.path()

  //draw the circles    
  circles = d3.select(el).select('svg').select('#events').selectAll('path')
    .data(dataObj.events.features);

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

 
