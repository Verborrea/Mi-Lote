mapboxgl.accessToken = 'pk.eyJ1IjoiYWxhbi0yNSIsImEiOiJjbGViaGI4aDkwcHpxM25udTAwaWcyczFrIn0.MZhpce5K1n4Gi7xBVGFj6Q';

const map = new mapboxgl.Map({
  container: 'mapa',
  style: 'mapbox://styles/mapbox/streets-v12',
  center: [-71.54, -16.40],
  zoom: 12
});

map.on('load', () => {
  map.addSource('vector-lotes', {
    type: 'vector',
    url: 'mapbox://alan-25.6jt2o6sq'
  });

  map.addLayer(
  {
  'id': 'lotes',
  'type': 'fill',
  'source': 'vector-lotes',
  'source-layer': 'combined-49xafm',
  'paint': {
    'fill-color': '#ff69b4'
    }
  }
  );
});

// const MIN_ZOOM_TO_SHOW_LOTES = 15;

// var map = L.map('mapa').setView([-16.398822, -71.536973], 12);

// let zonas = L.geoJSON.ajax('../json/zonas.json', {
//   style: function (feature) {
//     let mystyle = colorPorZona(feature);
//     mystyle.fillOpacity = 0.6;
//     mystyle.stroke = false;
//     return mystyle;
//   }
// });

// let lotes = L.geoJSON;

// function setLotesToDisplay(mapa, bounds) {
  
//   let options = {
//     style: function (feature) {
//       let mystyle = colorPorZona(feature);
//       mystyle.fillOpacity = 0.6;
//       mystyle.weight = 1;
//       return mystyle;
//     }
//   };



//   return L.geoJSON.ajax('../json/lotes/105.json', options);
// }

// L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
//   maxZoom: 19,
//   attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
// }).addTo(map);

// displayLayer(map, zonas);

// map.on('zoomend', function (ev) {
//   let current_zoom = map.getZoom();

//   if (current_zoom > MIN_ZOOM_TO_SHOW_LOTES) {
//     hideLayer(map, zonas);
//     hideLayer(map, lotes);

//     lotes = setLotesToDisplay(map, map.getBounds());
//     displayLayer(map, lotes);
//   }
//   else {
//     hideLayer(map, lotes);
//     displayLayer(map, zonas);
//   }
// });