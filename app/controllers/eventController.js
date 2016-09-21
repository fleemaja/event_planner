var _ = require('lodash');
var Event = require('../models/events.js');
var path = process.cwd();

exports.index = function(req, res) {

};

function handleError(res, err) {
  return res.status(500).send(err);
}
