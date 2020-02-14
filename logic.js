
// Create function for the map
function createMap(earthquakeLayerGroup){

  // Add Tile Layer
  const street = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
                  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
                  maxZoom: 30,
                  id: "mapbox.streets",
                  accessToken: API_KEY
                });

  // Create a base map object to hold the streetmap layer
  const baseMaps = {
  'Streets': street
  };

  // Create an overlay map object to hold the earthquake layer
  const overlayMap = {
  'Earthquakes': earthquakeLayerGroup
  };

    // Create Map Object
    const myMap = L.map("map", {
      center: [34.0522, -118.2437],
      zoom: 0,
      layers: [street, earthquakeLayerGroup]
    });

  // Create a layer control, pass in the baseMaps and overlayMaps. Add the layer control to the map
  L.control.layers(baseMaps, overlayMap).addTo(myMap);

}



// Create the create Markers

function createMarkers(data){
    const earthquake = data.features;
    console.log(earthquake);

    const earthquakeMarkers = earthquake.map( earthquake => {
      return L.circleMarker(earthquake.geometry.coordinates.slice(0, 2).reverse(), {
        fillOpacity: 1,
        fillColor: getColor(earthquake).fillColor,
        stroke: false
      })
      .setRadius(earthquake.properties.mag*4)
      .bindPopup(`<html>Location: ${earthquake.properties.place}<br>Magnitude: ${earthquake.properties.mag}</html>`)
    
      function getColor(earthquake){
        let color = '';
        switch (earthquake.properties.mag){
          case (earthquake.properties.mag < 3):
            color = 'red';
            break;
          default:
            color = 'yellow'
        }

        const mapStyle = {
          // color: color,
          fillColor: color,
          // fillOpacity: 1.0
        }
        console.log(`Magnitude: ${earthquake.properties.mag}`, mapStyle)
        console.log(earthquake.properties.mag)
        return mapStyle
      }
  
    })



  createMap(L.layerGroup(earthquakeMarkers))
}


url = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson'
d3.json(url).then( data => createMarkers(data));
