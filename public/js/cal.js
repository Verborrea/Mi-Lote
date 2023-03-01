let total = 0;
let costo_opciones = {};  //objeto que guarda las opciones escogidas en ambas monedas
let area = 0;
let area_input = document.getElementById("m2");
let currency = 'PEN';
let symbol = 'S/';

const url = new URL(window.location.href);

// Handle Input Autogrow
(function(){
    
  let min = 27, max = 240, input = document.getElementById('m2');

  input.style.width = min+'px';
  input.onkeypress = input.onkeydown = input.onkeyup = function(){
      let input = this;
      setTimeout(function(){
          let tmp = document.createElement('div');
          tmp.style.cssText = 'font-size: 16pt;border: none;padding: 0 1ch;position: absolute;';
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
  for (const categoria in costo_opciones) {
    const costo = costo_opciones[categoria][currency];
    total += Number(costo);
  }
  document.querySelector('#total').innerText = formatPrecio(total * area);
  document.querySelector('#totalm2').innerText = formatPrecio(total);
}

function toggleCategoria(categoria) {
  categoria.classList.toggle('oculta');
}

function selectOpcion(option) {
  option.toggleAttribute('selected');
  let categoria = option.getAttribute("name");
  let opciones = document.getElementsByName(categoria);
  for (const iterator of opciones) {
    if (iterator != option)
      iterator.classList.toggle('oculta');
  }

  let catergoria_id = option.parentNode.previousElementSibling.id[4];
  let next_id = parseInt(catergoria_id) + 1;
  if (next_id < 7) {
    toggleCategoria(document.querySelector('#cat-' + next_id));
  }

  costo_opciones[categoria] = {
    'PEN' : option.getAttribute('PEN'),
    'USD' : option.getAttribute('USD')
  };
  actualizarTotal();
}

function changeCurrency() {
  
  currency = (currency === 'PEN') ? 'USD' : 'PEN';
  symbol = (symbol === 'S/') ? '$' : 'S/';

  // cambiar la moneda en todas las opciones
  let opciones = document.querySelectorAll('.opcion');
  for (const opcion of opciones) {
    let precio_div = opcion.children[1];
    precio_div.innerText = symbol + ' ' + opcion.getAttribute(currency);
  }

  // cambiar la moneda en el total
  actualizarTotal();
}

area_input.addEventListener("change", function() {
  area = Number(area_input.value);
  actualizarTotal();
  document.querySelector('#selector').scrollIntoView({ block: "start" });
  if (total === 0) {
    toggleCategoria(document.querySelector('.categoria'));
  }
});

// Si hay un parametro area en la URL:
if (url.searchParams.has('area')) {
  area = Number(url.searchParams.get('area'));
  area_input.dispatchEvent(new Event('keypress', {bubbles:true}));
  area_input.dispatchEvent(new Event('change', {bubbles:true}));
}