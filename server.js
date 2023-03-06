const express = require("express");
const https = require('https');
const fs = require('fs');
const path = require('path');
const cron = require('node-cron');
const handlebars = require('express-handlebars');

const app = express();

app.engine('handlebars', handlebars.engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

app.use(express.static("public"));

app.use((request, response, next) => {
  response.header("Access-Control-Allow-Origin","*");
  response.header("Access-Control-Allow-Headers","X-Requested-With");
  next();
});

app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded({ extended: true }));

// routes

app.get("/", (request, response) => {
  response.sendFile(__dirname + "/views/index.html");
});

app.get("/mapa", (request, response) => {
  response.sendFile(__dirname + "/views/map.html");
});

app.get("/calculadora", (request, response) => {
  let precios = JSON.parse(fs.readFileSync('./public/json/precios.json'));
  response.render('calculadora', {
    layout: false,
    precios: precios,
    area: request.query.area ?? '',
    helpers: {
      loud(aString) {return aString.toUpperCase();}
    }
  });
});

cron.schedule('* 1 * * *', () => {
  let url = "https://api.currencyapi.com/v2/latest?apikey=b28ce780-77db-11ec-8706-6d30cb3e206b&base_currency=USD";

  https.get(url,(res) => {
    let body = "";

    res.on("data", (chunk) => {
      body += chunk;
    });

    res.on("end", () => {
      try {
        let tasa = JSON.parse(body).data.PEN;
        let precios = JSON.parse(fs.readFileSync('./public/json/precios.json'));

        for (const categoria in precios) {
          for (let i = 0; i < precios[categoria].length; i++) {
            precios[categoria][i].USD = precios[categoria][i].PEN / tasa;
          }
        }

        fs.writeFileSync('./public/json/precios.json', JSON.stringify(precios, null, 2));
        console.log("Precio del dólar actualizado");
      } catch (error) {
        console.error(error.message);
      };
    });

  }).on("error", (error) => {
    console.error(error.message);
  });
});

// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});