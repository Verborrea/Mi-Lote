(function(API){
  API.myText = function(txt, options, x, y) {
      options = options ||{};
      if( options.align == "center" ){
          var fontSize = this.internal.getFontSize();
          var pageWidth = this.internal.pageSize.width;
          txtWidth = this.getStringUnitWidth(txt)*fontSize/this.internal.scaleFactor;
          x = ( pageWidth - txtWidth ) / 2;
      }
      this.text(txt,x,y);
  }
})(jsPDF.API);

function capitalize(text) {
  text = text.toLowerCase();
  return text.charAt(0).toUpperCase() + text.slice(1);
}

function financial(x) {
  return formatPrecio(x);
}

function prepareCotBody() {
  console.log(opciones_escogidas);
  let cotBody = [];
  for (const i in opciones_escogidas) {
    let option = [];
    option.push(capitalize(opciones_escogidas[i]['categoria']));
    option.push(opciones_escogidas[i]['descripcion']);
    option.push(financial(opciones_escogidas[i][currency]));
    option.push(financial(opciones_escogidas[i][currency] * area));

    cotBody.push(option);
  }
  return cotBody;
}

function generateId() {
  let today = new Date();
  let DD = String(today.getDate()).padStart(2, '0');
  let MM = String(today.getMonth() + 1).padStart(2, '0');
  let YYYY = today.getFullYear();
  let hh = String(today.getHours()).padStart(2, '0');
  let mm = String(today.getMinutes()).padStart(2, '0');
  let ss = String(today.getSeconds()).padStart(2, '0');

  return 'C-' + DD + MM + YYYY + '-' + hh + mm + ss;
}

function printCotizacion() {
  const doc = new jsPDF();

  let cotBody = prepareCotBody();

  doc.myText("COTIZACIÓN",{align: "center"},0,15);
  doc.setFontSize(12);
  doc.myText(generateId(),{align: "center"},0,25);

  doc.text('Área Techada: ' + area + ' m2',15, 35);

  doc.autoTable({
    startY: 40,
    head: [['Categoría', 'Descripción', 'Precio x m2', 'Precio']],
    body: cotBody,
  });

  doc.setFontSize(12);

  let finalY = doc.lastAutoTable.finalY;
  doc.text(15, finalY + 10, 'Total: ' + financial(total));
  doc.text(15, finalY + 17, 'Total x m2: ' + financial(total * area));

  doc.output('dataurlnewwindow');
}