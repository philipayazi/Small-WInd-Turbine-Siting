// Create map object
    function createMap(speedMap) {

      const lightMap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
      attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
      maxZoom: 18,
      id: "mapbox.light",
      accessToken: API_KEY
    });
    const streetMap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
      attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
      maxZoom: 18,
      id: "mapbox.streets",
      accessToken: API_KEY
    });
    const darkMap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
      attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
      maxZoom: 18,
      id: "mapbox.dark",
      accessToken: API_KEY
    });
    const satelliteMap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
      attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
      maxZoom: 18,
      id: "mapbox.satellite-v9",
      accessToken: API_KEY
    });

    //Adding tile layer

    var myMap= L.map("map",{
      center: [37.0902,-95.7129],    
      zoom: 5,
      layer : [lightMap,speedMap]
    });


  const baseMaps = {
    // 'Satellite':satelliteMap,
    'Grey Map': lightMap,
    // 'Outdoors': outdoorMap,
    'Street Map': streetMap,
    'Dark Map' : darkMap,
    'satellite-v9':satelliteMap
  },
  overlayLayer = {
    'Wind Speed': speedMap,
  };

//   Create a layer control containing our baseMaps and overlay layer 
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
    }

//Create Markers
function createMarkers(data) {
  
      // L.CircleMarker = L.CircleMarker.extend({
      //   isSemicircle: function () { return false; }
      // });

      const speedMap=data.map(item =>{
        return L.circleMarker(item.loc,
        {radius: item.mph_avg*8,
        fillColor:getColor(item.mph_avg),
        color: "#000",
        weight: 1,
        opacity: 0.5,
        fillOpacity:1,
        startAngle:0,
        stopAngle:30
      })
      .bindPopup(`<html><strong>${item.city}
      <br>Average Speed:${item.mph_avg}<br> Average wind direction:${item.deg_avg}</strong></html>`)
      .on('mouseover', function (e) {
            this.openPopup();
      })
      .on('mouseout', function (e) {
          this.closePopup();
      });    
      }) 
      createMap(L.layerGroup(speedMap));
}

// Calling json data fron Flask API

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
//Color code
  // ['#ffffcc','#ffeda0','#fed976','#feb24c','#fd8d3c','#fc4e2a','#e31a1c','#bd0026','#800026']


 
