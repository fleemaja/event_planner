var http = require('http');
var express = require('express');
var routes = require('./app/routes/index.js');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.urlencoded());
require('dotenv').load();

app.set('view engine', 'ejs');

app.use('/controllers', express.static(process.cwd() + '/app/controllers'));
app.use('/public', express.static(process.cwd() + '/public'));

routes(app);

mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/clementinejs");

var port = 8080;
app.listen(port,  function () {
	console.log('Node.js listening on port ' + port + '...');
});
