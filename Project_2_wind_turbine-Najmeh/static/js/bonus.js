
var queryurl="https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// Perform a GET request to the query URL

d3.json(queryurl, function(data) {
    // console.log(data);
    // Once we get a response, send the data.features object to the createFeatures function
    console.log(data.features);
    createFeatures(data.features);
});

function createFeatures(earthquakeData){  
// Define a function we want to run once for each feature in the features array
    // Give each feature a popup describing the place and time of the earthquake
    var earthquakes = L.geoJSON(earthquakeData, {
      onEachFeature:function (feature, layer) {
        layer.bindPopup("<h3>" + feature.properties.place +
        "</h3><hr><p>" + new Date(feature.properties.time) + "</p>");
    },
      pointToLayer: function   (feature, latlng) {
      return  new L.circleMarker(latlng, 
        {radius: feature.properties.mag*7,
        fillColor:getColor(feature.properties.mag),
        color: "#000",
        weight: 1,
        opacity: 1,
        fillOpacity: 0.8
    })}
    
    
     
    });
  // Create a GeoJSON layer containing the features array on the earthquakeData object
  // Run the onEachFeature function once for each piece of data in the array
  
  createMap(earthquakes);  
} 
// Sending our earthquakes layer to the createMap function 
function createMap(earthquakes) {
    // Define maps layers
    const lightMap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.light",
    accessToken: API_KEY
  });

  const satelliteMap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.satellite",
    accessToken: API_KEY
  });
  const outdoorMap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.streets",
    accessToken: API_KEY
  });
  const darkmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.dark",
    accessToken: API_KEY
  });



  var myMap= L.map("map",{
    center: [37.0902,-95.7129],
 
    
    zoom: 5,
    layer : [lightMap,earthquakes]
  
  });
//   Define a baseMaps object to hold our base layers

  const baseMaps = {
    'Satellite':satelliteMap,
    'Grayscale': lightMap,
    'Outdoors': outdoorMap,
    'Dark Map': darkmap
  },
  overlayLayer = {
    'Earthquakes': earthquakes
  };
  
//   Create a layer control containing our baseMaps and overlay layer of the earthquake geoJson

  L.control.layers(baseMaps, overlayLayer, {
    collapsed: false
  }).addTo(myMap);
  myMap.addLayer(lightMap);
  myMap.addLayer(earthquakes);

// }

// Create Lagend
var legend = L.control({position: 'bottomright'});

legend.onAdd = function (myMap) {

    var div = L.DomUtil.create('div', 'info legend'),
    grades = [0, 1,2,3,4,5],
    labels = [];
    
    //idea from url:"https://gis.stackexchange.com/questions/193161/add-legend-to-leaflet-map" 
    for (var i = 0; i < grades.length; i++) {
      
        div.innerHTML +=
            '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
            grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');

      }

    return div;      
  };
  legend.addTo(myMap); 
}

   
function getColor(d) {
      return d > 5 ? '#de2d26' :
            d > 4  ? '#fb6a4a' :
            d > 3  ? '#fcae91' :
            d > 2 ? '#fee5d9':
            d > 1  ? '#e6f5c9' :
                      '#FFEDA0';
    }        
    
