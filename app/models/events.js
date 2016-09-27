'use strict';

var sanitizeHtml = require('sanitize-html');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var EventSchema = new Schema({
	  title: { type: String, required: true },
	  eventType: { type: String, required: true },
	  eventHost: { type: String, required: true },
	  startDate: { type: String, required: true },
	  endDate: { type: String, required: true },
	  guestList: [String],
	  eventLocation: { type: String, required: true },
	  message: String
});

// Automatically remove HTML from public facing fields on save
EventSchema.pre('save', function(next) {
  var sanitize = {
    allowedTags: [],
    allowedAttributes: []
  };

  this.title = sanitizeHtml(this.title, sanitize);
  this.eventType = sanitizeHtml(this.eventType, sanitize);
  this.eventHost = sanitizeHtml(this.eventHost, sanitize);
  this.guestList = this.guestList.map(function(guest){
    guest = sanitizeHtml(guest, sanitize);
    return guest;
  });
  this.guestList = this.guestList.filter(function(guest) {
    return guest != "";
  });
  this.eventLocation = sanitizeHtml(this.eventLocation, sanitize);
  this.message = sanitizeHtml(this.message, sanitize);
  next();
});

module.exports = mongoose.model('Event', EventSchema);
