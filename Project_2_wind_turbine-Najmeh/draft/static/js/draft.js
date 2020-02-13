const newYorkCoords = [40.73, -74.0059];
const mapZoomLevel = 12;
// Create the createMap function
// this function takes as input a layerGroup consisting wind speed average for 5 years
function createMap(overlayMaps){
    const lightMap = L.tileLayer('https://api.mapbox.com/v4/{id}/{z}/{x}/{y}@2x.jpg90?access_token={accessToken}',{
        id: 'mapbox.light',
        maxZoom: 18,
        accessToken: API_KEY,
        //attribution:
      });

      // Create a baseMaps object to hold the lightmap layer
      const baseMaps = {
        'Light': lightMap
      };

      // Create an overlayMaps object to hold the bikeStations layer
      // const overlayMaps = {
      //   'Bike Stations': bikeStations
      // }

      // Create the map object with options
    const layers = [lightMap];
    weatherLayers = Object.values(overlayMaps).forEach( city => layers.push(city));
    console.log('layers ', layers);
      const map = L.map('map',{
        center: newYorkCoords,
        zoom: mapZoomLevel,
        //layers: [lightMap, bikeStations]
        layers: layers
      });

      // Create a layer control, pass in the baseMaps and overlayMaps. Add the layer control to the map
      L.control.layers(baseMaps, overlayMaps).addTo(map)
    }

    // Create the createMarkers function
    // this function takes as input the json response object
    function createMarkers(weatherData){
      
      
        // Pull the "stations" property off of response.data
        //const stations = response.data.stations;
      
      
      // Loop through the stations array 
        // For each station, create a marker and bind a popup with the station's name
        // Add the marker to the bikeMarkers array
        const weatherSpeed = data.map(city => L.marker(location)
                                  .bindPopup(`<html><strong>${city}<br>Average Speed:${mph_avg}<br> Average wind direction:$${deg_avg}</strong></html>`)
                                   
          );
      

      // Create a layer group made from the bike markers array, pass it into the createMap function
        //createMap(L.layerGroup(bikeMarkers));
        return L.layerGroup(weatherSpeed);
}