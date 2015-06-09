var Map = {};

Map.create = function(el) { 
  console.log('map.create called: ', el);
  var mapOptions = {
            center: { lat: 37.7806579, lng: -122.40708},
            zoom: 10,
            disableDefaultUI: true
          };
          this.map = new google.maps.Map(el,
              mapOptions);

          this.map.setOptions({styles: this.styles});

}

Map.update = function(el, state) {
  console.log('update: ', state);
  var bounds = new google.maps.LatLngBounds();
  var map = this.map; 
  //remove the points that are already on the map
  map.data.forEach(function(feature) {
          map.data.remove(feature);
  });

  //add the points that represent the new event
  map.data.addGeoJson(state.data.events);

  map.data.setStyle(function(feature) {
    var radius = state.data.radius;
    if (feature.getProperty('isVisible')){
      if (feature.getProperty('isBroadcast')){
        return {
          icon: Map.getBroadcastCircle(radius)
        };
      } else if (feature.getProperty('isRecipient')){
        return {
          icon: Map.getRecipientCircle()
        }
      }
    } else {
      if (feature.getProperty('isBroadcast')){
        return {
          icon: Map.getInvisibleBroadcastCircle(radius)
        };
      } else if (feature.getProperty('isRecipient')){
        return {
          icon: Map.getInvisibleRecipientCircle()
        }
      }
    }
  });

  var i = 1; 
  map.data.forEach(function(feature) {
    var time = i * 100; 
    setTimeout(function(){
      feature.setProperty('isVisible', true);
    }, time);
    i++; 
  });

  state.data.feature.geometry.coordinates.forEach(function(coordinate) {
          a = coordinate[1];
          b = coordinate[0];
          console.log('a,b', a, ' ', b);
          point = new google.maps.LatLng(a, b);
          bounds.extend(point);
  });

  map.fitBounds(bounds)
}

Map.getBroadcastCircle = function(radius) {
  
    return {
      path: google.maps.SymbolPath.CIRCLE,
      scale: radius * 4,
      fillColor: 'red',
      fillOpacity: .5,
      strokeColor: 'white',
      strokeWeight: .5
    };
}

Map.getRecipientCircle = function() {
    return {
      path: google.maps.SymbolPath.CIRCLE,
      scale: 3,
      fillColor: 'red',
      fillOpacity: 1,
      strokeColor: 'white',
      strokeWeight: .5
    };
}

Map.getInvisibleBroadcastCircle = function(radius) {
    return {
      path: google.maps.SymbolPath.CIRCLE,
      scale: radius * 2,
      fillColor: 'red',
      fillOpacity: 0,
      strokeColor: 'white',
      strokeWeight: 0
    };
}

Map.getInvisibleRecipientCircle = function() {
    return {
      path: google.maps.SymbolPath.CIRCLE,
      scale: 3,
      fillColor: 'red',
      fillOpacity: 0,
      strokeColor: 'white',
      strokeWeight: 0
    };
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

 
