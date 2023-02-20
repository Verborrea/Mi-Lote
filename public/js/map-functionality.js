const MIN_ZOOM_TO_DISPLAY_LOTES = 14;

mapboxgl.accessToken = 'pk.eyJ1IjoiYWxhbi0yNSIsImEiOiJjbGViaGI4aDkwcHpxM25udTAwaWcyczFrIn0.MZhpce5K1n4Gi7xBVGFj6Q';

const map = new mapboxgl.Map({
	container: 'mapa',
	style: 'mapbox://styles/mapbox/streets-v12',
	center: [-71.54, -16.40],
	zoom: 12
});

map.on('load', () => {

	map.addSource('zonas', {
		type: 'geojson',
		data: '/json/zonas.geojson'
	});

	map.addLayer({
		'id': 'zonas-layer',
		'type': 'fill',
		'source': 'zonas',
		'maxzoom': MIN_ZOOM_TO_DISPLAY_LOTES,
		'paint': {
			'fill-opacity': 0.5,
			'fill-color': coloresPorZona
		}
	}, 'road-label');

});