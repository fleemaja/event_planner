'use strict';

var path = process.cwd();
var eventController = require(path + '/app/controllers/eventController.js');

module.exports = function (app) {
    app.route('/')
        .get(function(req, res) {
        	eventController.index(req, res);
        })
        .post(function(req, res) {
            eventController.create(req, res);
        });
}
