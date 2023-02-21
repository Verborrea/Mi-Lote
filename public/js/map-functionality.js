const MIN_ZOOM_TO_DISPLAY_LOTES = 14;

mapboxgl.accessToken = 'pk.eyJ1IjoiYWxhbi0yNSIsImEiOiJjbGViaGI4aDkwcHpxM25udTAwaWcyczFrIn0.MZhpce5K1n4Gi7xBVGFj6Q';

const map = new mapboxgl.Map({
	container: 'mapa',
	style: 'mapbox://styles/mapbox/streets-v12',
	center: [-71.54, -16.40],
	zoom: 12
});

let hoveredLoteId = null;
let clikedLoteId = null;

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

	map.addSource('lotes', {
		type: 'geojson',
		data: '/json/0.geojson',
		promoteId: 'id'
	});

	map.addLayer({
		'id': 'lotes-layer',
		'type': 'fill',
		'source': 'lotes',
		'minzoom': MIN_ZOOM_TO_DISPLAY_LOTES,
		'paint': {
			'fill-color': coloresPorZona,
			'fill-opacity': [
				'case',
				['boolean', ['feature-state', 'clicked'], false], 1,
				['boolean', ['feature-state', 'hover'], false], 0.75,
				0.5
			]
		}
	}, 'road-label');

	map.on('mousemove', 'lotes-layer', (e) => {
		if (e.features.length > 0) {
			if (hoveredLoteId !== null) {
				map.setFeatureState(
					{ source: 'lotes', id: hoveredLoteId },
					{ hover: false }
				);
			}
			hoveredLoteId = e.features[0].properties.id;
			map.setFeatureState(
				{ source: 'lotes', id: hoveredLoteId },
				{ hover: true }
			);
		}
	});
	 
	map.on('mouseleave', 'lotes-layer', () => {
		if (hoveredLoteId !== null) {
			map.setFeatureState(
				{ source: 'lotes', id: hoveredLoteId },
				{ hover: false }
			);
		}
		hoveredLoteId = null;
	});

	map.on('click', 'lotes-layer', (e) => {
		if (e.features.length > 0) {

			if (clikedLoteId !== null) {
				map.setFeatureState(
					{ source: 'lotes', id: clikedLoteId },
					{ clicked: false }
				);
			}

			clikedLoteId = e.features[0].properties.id;
			map.setFeatureState(
				{ source: 'lotes', id: clikedLoteId },
				{ clicked: true }
			);

			let lote = e.features[0];
			selectLote(lote);
		}
	});

});