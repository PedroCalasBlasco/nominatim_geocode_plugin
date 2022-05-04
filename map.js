const map = L.map('map', {
   center: [40.15, -77.25],
   zoom: 10,               
});

// Open Street Map 
const osm = L.tileLayer('//{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&#169; <a href="//www.openstreetmap.org/">OpenStreetMap</a> contributors, CC BY-SA license'
}).addTo(map);


// container for address search results
const addressSearchResults = new L.LayerGroup().addTo(map);

/*** Geocoder ***/
// OSM Geocoder
const osmGeocoder = new L.Control.geocoder({
    collapsed: false,
    position: 'topright',
    text: 'Address Search',
    placeholder: 'Enter street address',
   defaultMarkGeocode: false
}).addTo(map);    

// handle geocoding result event
osmGeocoder.on('markgeocode', e => {
   // to review result object
   console.log(e);
   // coordinates for result
   const coords = [e.geocode.center.lat, e.geocode.center.lng];
   // center map on result
   map.setView(coords, 16);
   // popup for location
   // todo: use custom icon
   const resultMarker = L.marker(coords).addTo(map);
   // add popup to marker with result text
   resultMarker.bindPopup(e.geocode.name).openPopup();
});