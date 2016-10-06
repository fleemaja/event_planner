var https = require('https');
var express = require('express');
var routes = require('./app/routes/index.js');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var flash    = require('connect-flash');

var passport = require('passport');
var session = require('express-session');

var app = express();
app.use(bodyParser.urlencoded());
require('dotenv').load();
require('./app/config/passport')(passport);

app.set('view engine', 'ejs');

app.use('/controllers', express.static(process.cwd() + '/app/controllers'));
app.use('/public', express.static(process.cwd() + '/public'));

app.use(flash()); // use connect-flash for flash messages stored in session

app.use(session({ secret: process.env.SUPER_SECRET }));
app.use(passport.initialize());
app.use(passport.session());

routes(app, passport);

mongoose.connect("mongodb://localhost:27017/clementinejs");

var port = process.env.PORT || 8080;
app.listen(port,  function () {
	console.log('Node.js listening on port ' + port + '...');
});

setInterval(function() {
    https.get("https://morning-reaches-98323.herokuapp.com/");
}, 300000); // ping every 5 minutes to keep heroku site from 'falling asleep'
