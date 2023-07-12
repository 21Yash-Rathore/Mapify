const MAPBOX_ACCESS_TOKEN =
  'pk.eyJ1IjoiMjEtYXNoIiwiYSI6ImNsanpqNTAyaDBjZnYzanMxMXl6azh0YW0ifQ.bZYVVdr1SsCsmHSj-yc-Og';

navigator.geolocation.getCurrentPosition(successLocation, errorLocation, {
  enableHighAccuracy: true,
});

function setupMap(centerPosition) {
  const map = new mapboxgl.Map({
    accessToken: MAPBOX_ACCESS_TOKEN,
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/satellite-v9', // style URL
    center: centerPosition, // starting position [lng, lat]
    zoom: 15, // starting zoom
  });

  // Map style switcher logic
  document.getElementById('streets').addEventListener('click', function () {
    map.setStyle('mapbox://styles/mapbox/streets-v11');
  });

  document.getElementById('satellite').addEventListener('click', function () {
    map.setStyle('mapbox://styles/mapbox/satellite-v9');
  });

  document.getElementById('dark').addEventListener('click', function () {
    map.setStyle('mapbox://styles/mapbox/dark-v11');
  });

  //   Add a fullscreen control to a map
  const fullscreenControl = new mapboxgl.FullscreenControl({
    container: document.querySelector('body'),
  });
  map.addControl(fullscreenControl);

  // Add zoom and rotation controls to the map.
  const NavigationControls = new mapboxgl.NavigationControl();
  map.addControl(NavigationControls);

  const navigationDirection = new MapboxDirections({
    accessToken: MAPBOX_ACCESS_TOKEN,
  });

  map.addControl(navigationDirection, 'top-left');

  // Add geolocate control to the map.
  const geolocateControl = new mapboxgl.GeolocateControl({
    positionOptions: {
      enableHighAccuracy: true,
    },
    // When active the map will receive updates to the device's location as it changes.
    trackUserLocation: true,
    // Draw an arrow next to the location dot to indicate which direction the device is heading.
    showUserHeading: true,
  });

  map.addControl(geolocateControl);
}

function successLocation(position) {
  setupMap([position.coords.longitude, position.coords.latitude]);
  console.log(position);
}

function errorLocation() {
  setupMap([-2.24, 53.48]);
}
