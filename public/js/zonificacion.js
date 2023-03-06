var zonificacion = [];
var distritos = [];
let uso_actual;	// boton de Uso Compatible activo (color rojo)
let area_lote;

function getPrecio(m2, precio_m2) {
	let precio = Math.round(m2 * precio_m2);
	let cadena = new Intl.NumberFormat('es-PE', { style: 'currency', currency: 'PEN' }).format(precio);
	return cadena.slice(0,-3);
}

// Actualizar la informaciòn del Lote
function selectLote(lote) {
	document.querySelector('#mznynro').innerText = lote.properties.n ?? '-';
	document.querySelector('#distrito').innerText = distritos[lote.properties.d];

	area_lote = turf.area(lote);
	document.querySelector('#area_total').innerHTML = Math.round(area_lote) + ' m<sup>2</sup>';

	selectZona(lote.properties.z);
}

function getAreaLibre(porcentaje) {
	let ratio = Number(porcentaje.replace('%',''));
	let area_libre = (Math.round(area_lote) * ratio) / 100;
	return Math.round(area_libre) + ' m<sup>2</sup>';
}

function getAreaTechada(coeficiente) {
	let area_techada = Math.round(area_lote * Number(coeficiente));

	document.querySelector('#link-calc').href = '/calculadora?area=' + area_techada + '#calculadora';
	// calcular precios en base al area
	document.querySelector('#precio-a').innerText = getPrecio(area_techada, 1260.37);
	document.querySelector('#precio-b').innerText = getPrecio(area_techada, 846.63);
	document.querySelector('#precio-c').innerText = getPrecio(area_techada, 629.12);

	return area_techada + ' m<sup>2</sup>';
}

// Actualizar área libre y àrea techada.
function actualizarAreas(aditional_info) {
	let area_libre = 'Según proyecto';
	let area_techada = 'Según proyecto';

	let uso = uso_actual.innerText;

	// Actualizar area libre
	if ('area_libre' in zonificacion[uso]) {
		area_libre = getAreaLibre(aditional_info['Área Libre'].substring(0,2));
	}
	document.querySelector('#area_libre').innerHTML = area_libre;

	// Actualizar area techada max.
	if ('area_techada' in zonificacion[uso]) {
		area_techada = getAreaTechada(aditional_info['Coeficiente de Edificación']);
	}
	if (uso == 'ZRE-PP') {
		area_techada = getAreaTechada((area_lote > 151)?'2.3':'1.85');
	}
	document.querySelector('#area_techada').innerHTML = area_techada;
}

// Actualizar el apartado de informacion con la zona seleccionada
function selectZona(zona_id)
{
	let zona = zonificacion[zona_id];

	document.querySelector('#zona-nombre').innerText = zona.nombre;
	document.querySelector('#zona-id').innerText = '<' + zona_id + '>';
	document.querySelector('#zona-descripcion').innerText = zona.descripcion;
	document.querySelector('#zona-usos').innerHTML = '';	// limpiar los botones de uso

	let default_btn;
	zona.compatibles.forEach(z_comp => {
		let btn = document.createElement('button');
		btn.innerText= z_comp;
		btn.setAttribute('onclick', 'selectUso(this)');
		if (z_comp === zona_id) default_btn = btn;
		document.querySelector('#zona-usos').appendChild(btn);
	});

	// Actualizar icono
	let iconData = getIconData(zona['tipo'] ?? 'Default');
	let icon = document.querySelector('#zona-icono');

	if(icon.firstChild) icon.removeChild(icon.firstChild);

	icon.style.background = iconData['color'];
	let img = document.createElement("img");
	img.src = '../icons/' + iconData['image'];
	icon.appendChild(img);

	uso_actual = default_btn;
	selectUso(default_btn);
}

// Actualizar el apartado de informacion con la zona del boton seleccionado
function selectUso(btn_uso)
{
	uso_actual.classList.remove('active');
	uso_actual = btn_uso;
	btn_uso.classList.add('active');
	let uso_id = btn_uso.innerText;
	let uso = zonificacion[uso_id];

	let descripcion = uso.descripcion.substring(0,150) + (uso.descripcion.length > 150 ? '...' : '');
	let info = document.querySelector('.zona-info-uso');
	info.innerHTML = '<div class="uso-nombre">'+
						'<div class="uso-escogido">' + uso.nombre + '</div>'+
						'<i class="fa-solid fa-circle-info">'+
							'<div class="tooltip uso" data="'+ descripcion + '"></div>'+
						'</i>'+
					'</div>';

	let aditional_info = uso.info;
	
	if (['RDM-1','RDM-2','RDA-1','RDA-2'].includes(uso_id)) {
		let div = document.createElement('div');
		div.classList.add('uso-residencial');
		div.innerHTML = '<span class="zona-span">Uso Residencial: </span>';
		info.appendChild(div);

		let select = document.createElement('select');
		select.setAttribute('onchange', 'selectUsoResidencial(this.value)');
		for (const uso_residencial in uso.info)
			select.innerHTML += '<option>' + uso_residencial + '</option>';
		div.appendChild(select);

		aditional_info = uso.info[select.value];
	}

	info.innerHTML += '<div id="uso-datos"></div>';
	showUsoInfo(aditional_info);
}

// Prepapar la info de la zona residencial para llamar a showUsoInfo()
function selectUsoResidencial(uso_residencial)
{
	let zona = zonificacion[uso_actual.innerText];
	showUsoInfo(zona['info'][uso_residencial]);
}

// Actualizar la información adicional de los .otros-div según 'infoObject'
// y actualiza el area libre y techada del lote en m2
function showUsoInfo(infoObject)
{
	document.querySelector('#uso-datos').innerHTML = '';
	for (const property in infoObject) {
		let div = document.createElement('div');
		div.classList.add('otros-div');
		
		div.innerHTML = '<span class="zona-span">' + property + ': </span>';
		let span_id = property.replace(/\s/g, '-');
		div.innerHTML += '<span id="' + span_id + '">' + infoObject[property] + '</span>';

		document.querySelector('#uso-datos').appendChild(div);
	}
	actualizarAreas(infoObject);
}

// Obtener json de zonificacion
fetch('../json/zonificacion.json')
.then(res => res.json())
.then(data => zonificacion = data)

// Obtener json de distritos
fetch('../json/distritos.json')
.then(res => res.json())
.then(data => distritos = data)