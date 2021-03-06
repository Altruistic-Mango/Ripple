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
        var scale = feature.getProperty('scale');
        return {
          icon: Map.getBroadcastCircle(radius * scale, scale/20)
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
      if (feature.getProperty('isBroadcast')){
        for (var j = 0; j <= 10; j++) {

          setTimeout(function(j){
            var newScale = Math.sin((Math.PI/2) * j/10) * 5
            feature.setProperty('scale', newScale);
          }, j * 60, j);
        }
      }
    }, time);
    i++; 
  });

  state.data.feature.geometry.coordinates.forEach(function(coordinate) {
          a = coordinate[1];
          b = coordinate[0];
          point = new google.maps.LatLng(a, b);
          bounds.extend(point);
  });

  map.fitBounds(bounds)
}

Map.getBroadcastCircle = function(setRadius, setOpacity) {
    return {
      path: google.maps.SymbolPath.CIRCLE,
      scale: setRadius,
      fillColor: 'red',
      fillOpacity: setOpacity,
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

 
