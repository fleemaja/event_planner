var http = require('http');
var express = require('express');
var routes = require('./app/routes/index.js');
var mongoose = require('mongoose');

var app = express();
require('dotenv').load();

app.set('view engine', 'ejs');

app.use('/controllers', express.static(process.cwd() + '/app/controllers'));
app.use('/public', express.static(process.cwd() + '/public'));

routes(app);

var port = 8080;
app.listen(port,  function () {
	console.log('Node.js listening on port ' + port + '...');
});
