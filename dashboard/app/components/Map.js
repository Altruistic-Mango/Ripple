var Map = {};

Map.create = function(el, props, state) { 
  console.log('map.create called: ', el);
  var mapOptions = {
            center: { lat: 37.7806579, lng: -122.40708},
            zoom: 10
          };
          this.map = new google.maps.Map(el,
              mapOptions);

          this.map.setOptions({styles: this.styles});

}

Map.update = function(el, state) {
  console.log('update: ', state);
  var bounds = new google.maps.LatLngBounds();
  var map = this.map; 
  map.data.forEach(function(feature) {
          map.data.remove(feature);
  });
  //remove any geoJSON on the map
  //this function needs to take the data passed down and add it as geoJSON to the map
  map.data.addGeoJson(state.data.events);

  state.data.feature.geometry.coordinates.forEach(function(coordinate) {
          a = coordinate[1];
          b = coordinate[0];
          console.log('a,b', a, ' ', b);
          point = new google.maps.LatLng(a, b);
          bounds.extend(point);
  });
  console.log('bounds: ', bounds);

  map.fitBounds(bounds)
}

Map.styles = [
  {
    "featureType": "administrative.province",
    "elementType": "geometry.stroke",
    "stylers": [
      { "visibility": "off" }
    ]
  },
  {
    "featureType": "road",
    "stylers": [
      { "visibility": "off" }
    ]
  },{
    "featureType": "transit",
    "stylers": [
      { "visibility": "off" }
    ]
  },{
    "featureType": "poi",
    "stylers": [
      { "visibility": "off" }
    ]
  },{
    "featureType": "landscape",
    "stylers": [
      { "visibility": "simplified" },
      { "saturation": 22 },
      { "lightness": -13 },
      { "hue": "#00fff7" },
      { "gamma": 0.82 }
    ]
  },{
    "featureType": "water",
    "stylers": [
      { "hue": "#00ffdd" },
      { "saturation": 15 },
      { "lightness": 28 },
      { "gamma": 0.95 }
    ]
  }
]


module.exports = Map; 

 
