var proxy = require('html2canvas-proxy');
var express = require('express');

var app = express();
var port = (6400);

app.use("/", proxy());

console.log("Server running on port", port);
app.listen(port);