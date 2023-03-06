var total = 0;
var opciones_escogidas = {};  //objeto que guarda las opciones escogidas en ambas monedas
var area = 0;
let area_input = document.getElementById("m2");
var currency = 'PEN';
var symbol = 'S/';

const url = new URL(window.location.href);

const grid_layout = ['1fr','1fr','1fr','1fr','1fr','1fr','1fr'];  //grid-auto-layout de #opciones

// Handle Input Autogrow
(function(){
    
  let min = 25, max = 240, input = document.getElementById('m2');

  input.style.width = min+'px';
  input.onkeypress = input.onkeydown = input.onkeyup = function(){
    let input = this;
    setTimeout(function(){
      let tmp = document.createElement('div');
      tmp.style.cssText = 'font-size: 16px;border: none;padding: 0 5px;position: absolute;';
      tmp.innerHTML = input.value.replace(/ /g, '&nbsp;');
      input.parentNode.appendChild(tmp);
      let width = tmp.clientWidth;
      tmp.parentNode.removeChild(tmp);
      if(min <= width && width <= max)
        input.style.width = width+'px';
    }, 1);
  }

})();

function formatPrecio(precio) {
  let lang = (currency === 'PEN') ? 'es-PE' : 'en-US';
	return new Intl.NumberFormat(lang, { style: 'currency', currency: currency }).format(precio);
}

function actualizarTotal() {
  total = 0;
  for (const opcion in opciones_escogidas) {
    const costo = opciones_escogidas[opcion][currency];
    total += Number(costo);
  }
  document.querySelector('#total').innerText = formatPrecio(total * area);
  document.querySelector('#totalm2').innerText = formatPrecio(total);
}

function changeCurrency() {
  currency = (currency === 'PEN') ? 'USD' : 'PEN';
  symbol = (symbol === 'S/') ? '$' : 'S/';

  // cambiar el simbolo del switch
  document.querySelector('.slider').innerText = symbol;

  // cambiar la moneda en todas las opciones
  let opciones = document.querySelectorAll('.precio');
  for (const opcion of opciones) {
    opcion.innerText = formatPrecio(opcion.getAttribute(currency));
  }

  // cambiar la moneda en el total
  actualizarTotal();
}

function toggleOpcion(opcion_id) {
  document.getElementById(opcion_id).classList.toggle('oculta');

  opcion_id = Number(opcion_id);


  let option_counter = 0;
  for (let i = 0; i < grid_layout.length; i++) {
    if (grid_layout[i] === '1fr') {
      if (option_counter === opcion_id) {
        if (grid_layout[i + 1] != 'auto') {
          grid_layout.splice(i + 1, 0, 'auto');
          document.getElementById('opciones').style.maxHeight = 'none';
        }
        else {
          grid_layout.splice(i + 1, 1);
          document.getElementById('opciones').style.maxHeight = '580px';
        }
        break;
      }
      option_counter++;
    }
  }

  document.getElementById('opciones').style.gridAutoRows = grid_layout.join(' ');
}

function selectSubopcion(subopcion) {
  let opcion_id = subopcion.getAttribute("option_id");
  toggleOpcion(opcion_id);

  let nombre = subopcion.children[0].innerText;
  let precio = subopcion.children[1];
  let nombre_div =  document.getElementById('nombre-' + opcion_id);
  let precio_div =  document.getElementById('precio-' + opcion_id);

  nombre_div.innerText = nombre;
  precio_div.innerText = formatPrecio(precio.getAttribute(currency));
  precio_div.setAttribute('PEN',precio.getAttribute('PEN'));
  precio_div.setAttribute('USD',precio.getAttribute('USD'));

  opciones_escogidas[opcion_id] = {
    'categoria': document.getElementById(opcion_id).querySelector('.nombre').innerText,
    'descripcion': nombre,
    'PEN' : precio.getAttribute('PEN'),
    'USD' : precio.getAttribute('USD')
  };
  actualizarTotal();

  // abrir panel de subopciones de la siguiente opcion
  if (Object.keys(opciones_escogidas).length < 7 && opcion_id < 6) {
    toggleOpcion(Number(opcion_id) + 1);
  }
}

area_input.addEventListener("change", function() {
  area = Number(area_input.value);
  actualizarTotal();
  if (total === 0) {
    toggleOpcion('0');
  }
});

// Si hay un parametro area en la URL:
if (url.searchParams.has('area')) {
  area = Number(url.searchParams.get('area'));
  area_input.dispatchEvent(new Event('keypress', {bubbles:true}));
  area_input.dispatchEvent(new Event('change', {bubbles:true}));
}

document.querySelector('#currency').addEventListener("change", changeCurrency);