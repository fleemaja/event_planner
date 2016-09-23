var _ = require('lodash');
var Event = require('../models/events.js');
var path = process.cwd();

exports.index = function(req, res) {
  Event.find({}, function(err, events) {
    if(err) { return handleError(res, err); }
    var user;
    if (req.user) {
      user = req.user._id.toString()
    }
    res.render(path + '/public/html/index.ejs', { events: events, user: user });
  });
};

exports.create = function(req, res) {
  Event.create(req.body, function(err, event) {
    if(err) { return handleError(res, err); }
    return res.redirect('/');
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}
