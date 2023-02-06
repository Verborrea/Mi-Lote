var zonificacion = [];
var distritos = [];
let uso_actual;	// boton de Uso Compatible activo (color rojo)

function GetMap()
{
	var map = new Microsoft.Maps.Map('#mapa', {
		center: new Microsoft.Maps.Location(-16.398822, -71.536973),
		zoom: 18
	});
}

// Actualizar el apartado #info
// {"z":"ZRE-RI2","n":"51","d":"q"}
function selectLote(lote) {
	selectZona(lote.z);
	document.querySelector("#mznynro") = lote.n;
	document.querySelector("#distrito") = distritos[lote.d];
}

// Actualizar el apartado de informacion con la zona seleccionada
function selectZona(_zona)
{
	let zona = zonificacion.find(o => o.id === _zona);

	document.querySelector("#zona-nombre").innerText = zona.nombre;
	document.querySelector("#zona-id").innerText = "<" + zona.id + ">";
	document.querySelector("#zona-descripcion").innerText = zona.descripcion;
	document.querySelector("#zona-usos").innerHTML = "";	// limpiar los botones de uso

	let default_btn;
	zona.compatibles.forEach(z_comp => {
		let btn = document.createElement('button');
		btn.innerText= z_comp;
		btn.setAttribute("onclick", "selectUso(this)");
		if (z_comp === zona.id) default_btn = btn;
		document.querySelector("#zona-usos").appendChild(btn);
	});

	uso_actual = default_btn;
	selectUso(default_btn);
}

// Actualizar el apartado de informacion con la zona del boton seleccionado
function selectUso(btn_uso)
{
	uso_actual.classList.remove("active");
	uso_actual = btn_uso;
	btn_uso.classList.add("active");
	let uso = zonificacion.find(o => o.id === btn_uso.innerText);

	let descripcion = uso.descripcion.substring(0,150) + (uso.descripcion.length > 150 ? "..." : "");
	let info = document.querySelector(".zona-info-uso");
	info.innerHTML = '<div class="uso-nombre">'+
						'<div class="uso-escogido">' + uso.nombre + '</div>'+
						'<i class="fa-solid fa-circle-info">'+
							'<div class="tooltip uso" data="'+ descripcion + '"></div>'+
						'</i>'+
					'</div>';

	let aditional_info = uso.info;
	
	if (["RDM-1","RDM-2","RDA-1","RDA-2"].includes(uso.id)) {
		let div = document.createElement("div");
		div.classList.add("uso-residencial");
		div.innerHTML = '<span class="zona-span">Uso Residencial: </span>';
		info.appendChild(div);

		let select = document.createElement("select");
		select.setAttribute("onchange", "selectUsoResidencial(this.value)");
		for (const uso_residencial in uso.info)
			select.innerHTML += "<option>" + uso_residencial + "</option>";
		div.appendChild(select);

		aditional_info = uso.info[select.value];
	}

	info.innerHTML += '<div id="uso-datos"></div>';
	showUsoInfo(aditional_info);
}

// Prepapar la info de la zona residencial para llamar a showUsoInfo()
function selectUsoResidencial(uso_residencial)
{
	let zona = zonificacion.find(o => o.id === uso_actual.innerText);
	showUsoInfo(zona["info"][uso_residencial]);
}

// Actualizar la información adicional de los .otros-div según 'infoObject'
function showUsoInfo(infoObject)
{
	document.querySelector("#uso-datos").innerHTML = "";
	for (const property in infoObject) {
		let div = document.createElement('div');
		div.classList.add("otros-div");
		
		div.innerHTML = '<span class="zona-span">' + property + ': </span>';
		let span_id = property.replace(/\s/g, "-");
		div.innerHTML += '<span id="' + span_id + '">' + infoObject[property] + '</span>';

		document.querySelector("#uso-datos").appendChild(div);
	}
}

// Obtener json de zonificacion
fetch("../zonificacion.json")
.then(res => res.json())
.then(data => zonificacion = data.zonas)

// Obtener json de distritos
fetch("../distritos.json")
.then(res => res.json())
.then(data => distritos = data)