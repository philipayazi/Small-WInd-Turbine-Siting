// Create function for the map
function createMap(citiesLayerGroup){

    // Add Tile Layer
    const street = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
                    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
                    maxZoom: 18,
                    id: "mapbox.streets",
                    accessToken: API_KEY
                  });
  
    // Create a base map object to hold the streetmap layer
    const baseMaps = {
    'Streets': street
    };
  
    // Create an overlay map object to hold the earthquake layer
    const overlayMap = {
    'Cities': citiesLayerGroup
    };
  
      // Create Map Object
      const myMap = L.map("map", {
        center: [39.8283, -98.5795 ],
        zoom: 5,
        layers: [street, citiesLayerGroup]
      });
  
    // Create a layer control, pass in the baseMaps and overlayMaps. Add the layer control to the map
    L.control.layers(baseMaps, overlayMap).addTo(myMap);
  
  }
  
  
  
  // Create the create Markers
  
  function createMarkers(data){
        console.log(data);
        
      const deg_change = data.map( direction => {
        return L.circleMarker(direction.loc, {
          fillOpacity: 1,
          // fillColor: getColor(earthquake).fillColor,
          stroke: false
        })
        .setRadius(direction.change_mph_avg*20)
        .bindPopup(`<html>City: ${direction.city}<br>Avg Change MPH: ${direction.change_mph_avg}</html>`)
      
      //   function getColor(earthquake){
      //     let color = '';
      //     switch (earthquake.properties.mag){
      //       case (earthquake.properties.mag < 3):
      //         color = 'red';
      //         break;
      //       default:
      //         color = 'yellow'
      //     }
  
      //     const mapStyle = {
      //       // color: color,
      //       fillColor: color,
      //       // fillOpacity: 1.0
      //     }
      //     // console.log(`Magnitude: ${earthquake.properties.mag}`, mapStyle)
      //     // console.log(earthquake.properties.mag)
      //     return mapStyle
      //   }
    
      })
      
  
  
  
    createMap(L.layerGroup(deg_change))
  }
  
  url = "/allcities"
  // url = "http://localhost:5000/wind_speed_changes"

  d3.json(url).then( data => createMarkers(data))