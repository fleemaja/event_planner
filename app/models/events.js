'use strict';

var sanitizeHtml = require('sanitize-html');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var EventSchema = new Schema({
	  title: { type: String, required: true }
});

// Automatically remove HTML from public facing fields on save
EventSchema.pre('save', function(next) {
  var sanitize = {
    allowedTags: [],
    allowedAttributes: []
  };

  this.title = sanitizeHtml(this.title, sanitize);
  this.title = this.title.slice(0, 140);
  next();
});

module.exports = mongoose.model('Event', EventSchema);
