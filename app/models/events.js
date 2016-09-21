'use strict';

var sanitizeHtml = require('sanitize-html');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var EventSchema = new Schema({
	  title: { type: String, required: true },
    user: { type:Schema.ObjectId, ref:"User", childPath:"polls" },
    username: String,
    date: { type: Date, default: Date.now },
    options: {
        type: [{
            text: String,
            votes: Number
        }],
        validate: [arrayMin, 'Not enough Poll Options']
    },
    category: { type: String, required: true, enum: ['sports', 'movies', 'music', 'food', 'science', 'news', 'misc'] },
    voters: []
});

// Automatically remove HTML from public facing fields on save
EventSchema.pre('save', function(next) {
  var sanitize = {
    allowedTags: [],
    allowedAttributes: []
  };

  this.title = sanitizeHtml(this.title, sanitize);
  this.title = this.title.slice(0, 140);
  this.options = this.options.map(function(option){
      option.text = sanitizeHtml(option.text, sanitize);
      // 50 char max
      option.text = option.text.slice(0, 41);
      return option;
    });
  next();
});

module.exports = mongoose.model('Event', EventSchema);
