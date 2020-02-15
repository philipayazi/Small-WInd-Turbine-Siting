customCircleMarker = L.CircleMarker.extend({
  options: { 
     city: 'Custom data!'
  }
});

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

      const mph_change = data.map( direction => {
        return new customCircleMarker(direction.loc, {
          fillOpacity: 1,
          // fillColor: getColor(earthquake).fillColor,
          stroke: false,
          city: direction.city
        })
        .setRadius(direction.change_deg_avg*0.5)
        .bindPopup(`<html>City: ${direction.city}<br>Avg Change Degree: ${direction.change_deg_avg}</html>`)
        .on('click', function(){
          console.log(this)
          window.open(`/heatmap/${this.options.city}`, '_blank')
        })
      
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
      
  
  
  
    createMap(L.layerGroup(mph_change))
  }
  
  url = "/allcities"
  d3.json(url).then( data => createMarkers(data))