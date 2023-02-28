// let cant_pisos = 1;
// let ops = [];
// let pos = 7;

// let pref = [];
// let acum = [];
// let c_id = 'myc';

// let moneda = 0;
// let dist = 0;
// let sim = 's/ ';
// let object = { maximumFractionDigits: 2, minimumFractionDigits: 2 };

// let precios;
// let cambio = 4;

// const hashmap = {
//   myc: 0,
//   tch: 1,
//   pis: 2,
//   pyv: 3,
//   rev: 4, 
//   ban: 5,
//   ins: 6
// }

// function cambio_mon() { // <------------------------------ cambio ------------------------------
//   let ops_prev = ops;
//   moneda = ((document.getElementById('moneda_input').value === '0')?false:true);
//   sim = (moneda?'$ ':'s/ ');

//   let divs = document.getElementsByClassName('div_op');
//   let cant;
//   for(let i = 0; i < divs.length; i++){
//     let fam = divs[i].children[0].getAttribute("id").substring(0, 3);
//     let op = divs[i].children[0].getAttribute("id").substring(3);
    
//     if (moneda == true) {
//       cant = precios.precios[hashmap[fam]].tipos[op].dolares;
//     }else{
//       cant = precios.precios[hashmap[fam]].tipos[op].soles;
//     }
//     divs[i].children[0].setAttribute("price", cant);
//     divs[i].children[1].children[1].innerText = sim + cant.toLocaleString('en-US', object);
//   }
//   for(let i=0; i<7 ;i++){
//     show_op(i);
//     show_op(i);
//     calcular(); 
//   }
// }

// function calcular() {  // <------------------------------ cambio ------------------------------
//   let total = 0;
//   let lot = document.getElementById('area_input').value;
//   for (let i = 0; i < ops.length; i++) {
//     if(ops[i].checked == true) {
//       acum[pos] = ops[i].getAttribute("price");
//       pref[pos] = i;
//       break;
//     }
//   } 
//   for(let i=0; i < acum.length ; i++){
//     if(acum[i]){
//      total += parseFloat(acum[i]); 
//     }
//   }
//   document.getElementById('res1').value = (moneda?'$ ':'s/ ') + (total).toLocaleString('en-US', object);
//   document.getElementById('res2').value = (moneda?'$ ':'s/ ') + (total*lot).toLocaleString('en-US', object);
// }

// function elegir(e){
//   pos = e.parentNode.parentNode.getAttribute('pos');
//   let sp = e.id.slice(0, 3);
//   c_id = e.id.slice(0, 3);
//   ops = document.getElementsByName(c_id);
//   let divs = document.getElementById(c_id).getElementsByClassName('div_op');
//   if(divs[0].style.display == 'none' || divs[1].style.display == 'none') {
//     e.checked = false;
//     for(let i=0; i< ops.length;i++){
//       divs[i].style.display = 'block';
//     }
//     return;
//   }
//   for(let i=0; i< ops.length;i++){
//     if(ops[i].checked == false) {
//       divs[i].style.display = 'none';
//     }
//   }
//   if(pos < 6){
//     window.scrollBy(0, dist);
//     show_op(parseInt(pos, 10)+1); 
//   }
// }

// function show_op(p) {  // <------------------------------ cambio en el utlimo loop --------------------------------

//   let divs = document.getElementsByClassName('options');
//   let op = precios.precios[p];
//   let id = op.id;
//   c_id = id;
//   let res;
//   pos = p;
//   ops = document.getElementsByName(id.toString());
//   //switch
//   if(divs[p].style.display == 'block'){
//     divs[p].style.display = 'none';
//   }else{
//     divs[p].style.display = 'block';
//   }
//   //esconder todos menos donde se hizo click
//   for(let i=0; i < divs.length; i++){
//     if(p != i && pref[i] == undefined){
//       divs[i].style.display = 'none'; 
//     }else if(p == i && pref[i] != undefined){
//       divs[i].style.display = 'block'; 
//     }
//   }
//   // si esta en blanco: poner todas las opciones
//   if(document.getElementById(id).innerHTML == ''){
//     let len = op.tipos.length;
//     let op_html = "";
//     for(let i = 0; i < len; i++){
//       res = moneda ? (op.tipos[i].dolares) : (op.tipos[i].soles);
//       op_html += "<div class=\"div_op\">";
//       op_html += "<input type=\"radio\" name=\"" + id;
//       op_html += "\" id=\"" + id + i.toString() + "\" onclick=\"calcular(); elegir(this);\" price=\"" + res +'\" value=\"' + i.toString() +'\"';
//       op_html += "><div class=\"radio_op\"><label for=\"" + id + i.toString() + '\">' + op.tipos[i].name + '</label>';
//       op_html += "<div class=\"price\">" + sim + res.toFixed(2) + '</div></div></div>';
//     }
//     document.getElementById(id).innerHTML = op_html;
//   }
// }
// // <------------------------------ cambio de request a fetch --------------------------------
// function init() {  
//   // ================ cargar json de precios ==================
//   fetch('https://milote.glitch.me/precios')
//   .then(response => response.json())
//   .then(data =>{
//     cambio = data.precios[0].tipos[0].soles/data.precios[0].tipos[0].dolares;
//     precios = data;
//     show_op(0);
//     dist = document.getElementById('bts').children[0].scrollHeight;
//     dist += document.getElementsByClassName('div_op')[0].scrollHeight;
//     calcular();
//   });
// }

let total = 0;

function toggleCategoria(categoria) {
  categoria.classList.toggle('oculta');
}

// Handle Input Autogrow
(function(){
    
  let min = 27, max = 240, input = document.getElementById('m2');

  input.style.width = min+'px';
  input.onkeypress = input.onkeydown = input.onkeyup = function(){
      let input = this;
      setTimeout(function(){
          let tmp = document.createElement('div');
          tmp.style.cssText = 'font-size: 16pt;border: none;padding: 0 1ch;';
          tmp.style.position = 'absolute';
          tmp.innerHTML = input.value.replace(/&/g, "&amp;")
                                     .replace(/</g, "&lt;")
                                     .replace(/>/g, "&gt;")
                                     .replace(/"/g, "&quot;")
                                     .replace(/'/g, "&#039;")
                                     .replace(/ /g, '&nbsp;');
          input.parentNode.appendChild(tmp);
          let width = tmp.clientWidth;
          tmp.parentNode.removeChild(tmp);
          if(min <= width && width <= max)
              input.style.width = width+'px';
      }, 1);
  }

})();
// Autogrow area input on page loading
document.querySelector('#m2').dispatchEvent(new Event('keypress', {bubbles:true}));


document.getElementById("m2").addEventListener("change", function() {
  console.log("change event fired");
  toggleCategoria(document.querySelector('.categoria'));
  setTimeout(()=>{
    document.querySelector('#xd').scrollIntoView({ block: "start" });
  }, 250);
}, false);

function selectOpcion(option) {
  let categoria = option.getAttribute("name");
  let opciones = document.getElementsByName(categoria);
  for (const iterator of opciones) {
    if (iterator != option)
      iterator.classList.toggle('oculta');
  }
}