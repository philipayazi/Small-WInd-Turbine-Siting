var url="http://127.0.0.1:5000/";

// var data=data;
// Perform a GET request to the query URL

d3.json(url, function(data) {
    // jsonData=data;
    console.log(data);

  //   createMarkers(data.loc);
  
  function createMarkers(weatherData) {
            speedMap=data.forEach(item => {
            var cities=console.log(item.city);
            var windSpeed= console.log(item.mph_avg);
            var windDirection=console.log(item.deg_avg);
            var latlng=console.log(item.loc); 
          //   // Setting the marker radius for the city by passing weather speed into the markerSize function
                 
               return L.circleMarker(latlng,
                {radius: windSpeed,
                fillColor:getColor(windSpeed),
                color: "#000",
                weight: 1,
                opacity: 1,
                fillOpacity: 0.8 
              }).bindPopup(`<html><strong>${cities}
              // <br>Average wind Speed:${windSpeed}<br> Average wind direction:$${windDirection}</strong></html>`) 
            // }
            // createMap(speedMap);

            }); 
            createMap(speedMap);  
          
        }
      // createMap(data.loc);

// });


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
      }
      legend.addTo(myMap); 
    
}
});


    function getColor(d) {
      return d > 5 ? '#de2d26' :
            d > 4  ? '#fb6a4a' :
            d > 3  ? '#fcae91' :
            d > 2 ? '#fee5d9':
            d > 1  ? '#e6f5c9' :
                      '#FFEDA0';
  }

   
      
    
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