var _ = require('lodash');
var Event = require('../models/events.js');
var path = process.cwd();

exports.index = function(req, res) {
  Event.find({}, function(err, events) {
    if(err) { return handleError(res, err); }
    var user;
    if (req.user) {
      user = req.user.name;
    }
    res.render(path + '/public/html/index.ejs', { events: events, user: user });
  });
};

exports.create = function(req, res) {
  var eventData = _.clone(req.body, true);
  eventData.guestList = eventData.guestList.split(",");
  Event.create(eventData, function(err, event) {
    if(err) { return handleError(res, err); }
    return res.redirect('/');
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}
