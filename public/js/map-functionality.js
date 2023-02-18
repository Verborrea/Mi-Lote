const MIN_ZOOM_TO_SHOW_LOTES = 15;

var map = L.map('mapa').setView([-16.398822, -71.536973], 12);

let zonas = L.geoJSON.ajax('../json/zonas.json',
  {
    style: function(feature) {
      let mystyle = colorPorZona(feature);
      mystyle.fillOpacity = 0.6;
      mystyle.stroke = false;
      return mystyle;
    }
  }
);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

displayLayer(map, zonas);

map.on('zoomend', function (ev) {
  let current_zoom = map.getZoom();

  if (current_zoom > MIN_ZOOM_TO_SHOW_LOTES) {
    hideLayer(map, zonas);
  }
  else {
    displayLayer(map, zonas);
  }
});