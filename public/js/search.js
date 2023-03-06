function buscar() {
  let direccion = document.getElementById('busqueda_direccion').value + 'Arequipa';

  // Obtener json de resultado
  fetch('https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyDNw4XgclEE_dweeJTWGENDouXsV4Iwu6A&address=' + encodeURI(direccion))
  .then(res => res.json())
  .then(data => {
    let ne = data.results[0].geometry.viewport.northeast;
    let sw = data.results[0].geometry.viewport.southwest;

    map.fitBounds([
      [ne.lng, ne.lat], // southwestern corner of the bounds
      [sw.lng, sw.lat] // northeastern corner of the bounds
    ]);
  });
}