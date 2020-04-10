customCircleMarker = L.CircleMarker.extend({
  options: { 
     city: 'Custom data!'
  }
});

// Create function for the map
function createMap(citiesLayerGroup){

    // Add Tile Layer
    const dark = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
                    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
                    maxZoom: 18,
                    id: "mapbox.dark",
                    accessToken: API_KEY
                  });
    
    const light = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
      attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
      maxZoom: 18,
      id: "mapbox.light",
      accessToken: API_KEY
    });
  
    // Create a base map object to hold the streetmap layer
    const baseMaps = {
      'Light': light,
      'Dark': dark
    };
  
    // Create an overlay map object to hold the markers
    const overlayMap = {
    'Velocity Change': citiesLayerGroup,
    // 'DirectionChange': velocityMarker
    };
  
      // Create Map Object
      const myMap = L.map("map", {
        center: [39.8283, -98.5795 ],
        zoom: 5,
        layers: [light, citiesLayerGroup]
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
      })
  
    

    //   const velocityMarker = data.map(city => {
    //     return L.circleMarker(city.loc, {
    //       fillOpacity: 0.5,
    //       stroke: false
    //     })
    //     .setRadius(city.change_mph_avg*20)
    //     .bindPopup(`<html>City: ${city.city}<br>Avg Change (mpH): ${city.change_mph_avg}<html>`)
    //   })

    createMap(L.layerGroup(mph_change))
    

    // myMap.addLayer(velocityMarker)
  }

  function velocityMarker(data){
    console.log(data);
    
    const deg_change = data.map( direction => {
        return L.circleMarker(direction.loc, {
          fillOpacity: 1,
          stroke: false
        })
        .setRadius(direction.change_mph_avg*20)
        .bindPopup(`<html>City: ${direction.city}<br>Avg Change MPH: ${direction.change_mph_avg}</html>`)

      })
          
      
      
      
      L.layerGroup(deg_change).addTo(myMap)
    }

  
  
  url = "/allcities"
  d3.json(url).then(data =>
    createMarkers(data)
    // velocityMarker(data)
  );