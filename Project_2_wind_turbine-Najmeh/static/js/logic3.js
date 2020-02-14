
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
  }).addTo(myMap);
  myMap.addLayer(lightMap);
  myMap.addLayer(speedMap);

// Create Lagend
var legend = L.control({position: 'bottomright'});

legend.onAdd = function (myMap) {

    var div = L.DomUtil.create('div', 'info legend'),
    grades = [0, 1,2,3,4,5],
    labels = [];
    for (var i = 0; i < grades.length; i++) {
      
        div.innerHTML +=
            '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
            grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');

      }

    return div;      
  };
  legend.addTo(myMap); 

  var CanvasLayer = L.GridLayer.extend({
    createTile: function(coords){
        // create a <canvas> element for drawing
        var tile = L.DomUtil.create('canvas', 'leaflet-tile');
        // setup tile width and height according to the options
        var size = this.getTileSize();
        tile.width = size.x;
        tile.height = size.y;
        // get a canvas context and draw something on it using coords.x, coords.y and coords.z
        var ctx = tile.getContext('2d');
        // return the tile so it can be rendered on screen
        return tile;
    }
});
















}
function createMarkers(data) {

      const speedMap=data.map(item =>{
        return L.circleMarker(item.loc,
        {radius: item.mph_avg*8,
        fillColor:getColor(item.mph_avg),
        color: "#000",
        // weight: 1,
        opacity: 0.5,
        fillOpacity:1
      })
      // .setRadius(data.mph_avg)
      .bindPopup(`<html><strong>${item.city}
      <br>Average Speed:${item.mph_avg}<br> Average wind direction:${item.deg_avg}</strong></html>`)
      })
     
      createMap(L.layerGroup(speedMap));
  // });

}

var queryurl="http://127.0.0.1:5000/";
d3.json(queryurl, function(data) {
    console.log(data);
    createMarkers(data);
                 
});

  function getColor(d) {
      return d > 5 ? '#67000d' :
            d > 4.5 ? '#800026' :
            d > 4 ? '#bd0026':
            d > 3.5 ? '#e31a1c' :
            d > 3 ? '#fc4e2a':
            d > 2.5 ? '#fd8d3c' :
            d > 2  ? '#feb24c' :
            d > 1.5  ? '#fed976' :
            d > 1 ? '#ffeda0':
            d > 0.5  ? '#ffffcc' :
                      '#FFEDA0';
  }













  
  
// // Create Lagend
// // var legend = L.control({position: 'bottomright'});

// // legend.onAdd = function (myMap) {

// //     var div = L.DomUtil.create('div', 'info legend'),
// //     grades = [0, 1,2,3,4,5],
// //     labels = [];
// //     for (var i = 0; i < grades.length; i++) {
      
// //         div.innerHTML +=
// //             '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
// //             grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');

// //       }

// //     return div;      
// //   };
// //   legend.addTo(myMap); 


   
      
    
// // click event to go to the url

//   //   for (var i = 0; i < markers.length; i++) {
//   //     var a = markers[i];
//   //     var title = a[2];
//   //     var link = a[3];
//   //     var image = a[4];
//   //  var list = 
//   //     "<dl>"
//   //         + "<dt>" + title + "</dt>"
//   //         + image
//   //         +
//   //    "</dl>";
//   //     var marker = new L.Marker(new L.LatLng(a[0], a[1]), { riseOnHover: true }).bindLabel(list).addTo(map);
//   //     marker.on("click", function() {
//   //         window.open(link, "_blank");
//   //         }
//   //     );  
