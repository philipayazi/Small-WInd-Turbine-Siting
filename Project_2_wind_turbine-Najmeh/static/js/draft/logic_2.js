
// Sending our weatherData layer to the createMap function 

function createMap(speedMap) {
    // Define maps layers
    const lightMap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.light",
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
    layer : [lightMap,speedMap]
  
  });
  // var cities = L.layerGroup(cityMarkers);
  
  const baseMaps = {
    // 'Satellite':satelliteMap,
    'Average of Wind direction': lightMap,
    // 'Outdoors': outdoorMap,
    'Average of Wind Speed': darkmap
  },
  overlayLayer = {
    'Wind Speed': speedMap,
  };
  
  //   Create a layer control containing our baseMaps and overlay layer of the earthquake geoJson
  
  L.control.layers(baseMaps, overlayLayer, {
  collapsed: true
  });
  
  myMap.addLayer(darkmap);
  myMap.addLayer(speedMap); 
  }
  
  function createMarkers(data) {
  // var speedMap=data.forEach(item => {
  // var cities=console.log(item.city);
  // var windSpeed= console.log(item.mph_avg);
  // var windDirection=console.log(item.deg_avg);
  // var latlng=console.log(item.loc); 
  //   // Setting the marker radius for the city by passing weather speed into the markerSize function
    var speedMap=data.map(item => { 
     return L.circleMarker(data.loc,
    {radius: data.mph_avg,
    fillColor:getColor(data.mph_avg),
    color: "#000",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8 
  }).bindPopup(`<html><strong>${data.city}
  // <br>Average wind Speed:${data.mph_avg}<br> Average wind direction:$${data.deg_avg}</strong></html>`) 
  
  
  createMap(speedMap); 
    }); 
  
//   createMap(speedMap); 
  }
  
  function getColor(d) {
  return d > 5 ? '#de2d26' :
        d > 4  ? '#fb6a4a' :
        d > 3  ? '#fcae91' :
        d > 2 ? '#fee5d9':
        d > 1  ? '#e6f5c9' :
                  '#FFEDA0';
  }
  
//    var url="http://127.0.0.1:5000/";  
//   //  d3.json(url).then(data => createMarkers(data)); 
//   d3.json(url)
//     .then(function(data){
//       console.log(data);
//   });  
  var url="http://127.0.0.1:5000/";
  // Perform a GET request to the query URL
  
  d3.json(url, function(data) {
  // jsonData=data;
  
  createMarkers(data); 
  });
  
  