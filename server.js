const express = require("express");
const app = express();
// const schedule = require('node-schedule');
const https = require('https');
const fs = require('fs');
const precios_json_name = './precios.json';
const precios_json = require(precios_json_name);

app.set('view engine', 'hbs');

// make all the files in 'public' available
// https://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

app.use((request, response, next) => {
  response.header("Access-Control-Allow-Origin","*");
  response.header("Access-Control-Allow-Headers","X-Requested-With");
  next();
});

app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded({ extended: true }));

app.get("/", (request, response) => {
  response.sendFile(__dirname + "/views/map.html");
  // response.render('index');
});

app.get("/map", (request, response) => {
  response.sendFile(__dirname + "/views/map.html");
});

app.get("/nosotros", (request, response) => {
  response.render('nosotros');
});

app.get("/calculadora/", (request, response) => {
  response.render('cal', {output: 100});
});

app.get("/calculadora/:area", (request, response) => {
  response.render('cal', {output: request.params.area});
});

app.get("/doc", (request, response) => {
  response.render('doc/doc');
});

// ----------------------------------- nuevo -----------------------------------

app.post("/print_cot", (request, response) => {
  let format = { maximumFractionDigits: 2, minimumFractionDigits: 2 };
  let p = precios_json.precios;
  let columnas = [];
  for (let i = 0; i < p.length; i++) {
    if (p[i].id in request.body) {
      let precio;
      if (request.body.moneda === "1") {
        precio = '$ ' + p[i].tipos[request.body[p[i].id]].dolares.toLocaleString('en-US', format);
      }else{
        precio = 's/ '+ p[i].tipos[request.body[p[i].id]].soles.toLocaleString('en-US', format);
      }
      columnas.push({
        name: p[i].name,
        option: p[i].tipos[request.body[p[i].id]].name,
        precio: precio
      });
    }
  }
  
  response.render('cotizacion', {
    area: request.body.area,
    pm2: request.body.pm2,
    total: request.body.total,
    columnas: columnas
  });
});

app.get("/precios", (request, response) => {
  response.sendFile(__dirname + "/precios.json");
})

var cron = require('node-cron');

cron.schedule('* 1 * * *', () => {
  let url = "https://api.currencyapi.com/v2/latest?apikey=b28ce780-77db-11ec-8706-6d30cb3e206b&base_currency=USD";

  https.get(url,(res) => {
    let body = "";

    res.on("data", (chunk) => {
        body += chunk;
    });

    res.on("end", () => {
      try {
        let json = JSON.parse(body);

        const file_content = fs.readFileSync("precios.json");
        let content = JSON.parse(file_content);

        for (let i = 0; i < content.precios.length; i++){
          for (let j = 0; j < content.precios[i].tipos.length; j++){
            content.precios[i].tipos[j].dolares = content.precios[i].tipos[j].soles / json.data.PEN;
          }
        }

        fs.writeFileSync('precios.json', JSON.stringify(content, null, 2));
        console.log("Precio del dólar actualizado");
      } catch (error) {
          console.error(error.message);
      };
    });

  }).on("error", (error) => {
      console.error(error.message);
  });
});

// ----------------------------------- fin -----------------------------------

app.get("/doc/:page", (request, response) => {
  response.render('doc/' + request.params.page.substring(0,3));
});

// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});