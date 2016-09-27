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

var months = {
  '01': 'Jan',
  '02': 'Feb',
  '03': 'Mar',
  '04': 'Apr',
  '05': 'May',
  '06': 'Jun',
  '07': 'Jul',
  '08': 'Aug',
  '09': 'Sep',
  '10': 'Oct',
  '11': 'Nov',
  '12': 'Dec'
}

function getDay(day) {
  return parseInt(day, 10);
}

function getFormattedTime(fourDigitTime) {
    var hours24 = parseInt(fourDigitTime.substring(0, 2),10);
    var hours = ((hours24 + 11) % 12) + 1;
    var amPm = hours24 > 11 ? 'pm' : 'am';
    var minutes = fourDigitTime.substring(2);

    return hours + ':' + minutes + amPm;
};

function formatDateTime(dateTime) {
  // dateTime example string: '2016-10-11T03:00'
  var dateTimeSplit = dateTime.split("T");
  var date = dateTimeSplit[0]; var time = dateTimeSplit[1];
  var dateSplit = date.split("-");
  var year = dateSplit[0]; var month = months[dateSplit[1]]; 
  var day = getDay(dateSplit[2]);
  
  var timeSplit = time.split(":");
  var time = getFormattedTime(timeSplit[0] + timeSplit[1]);
  
  return month + " " + day + ", " + year + " " + time;
}

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
  this.startDate = formatDateTime(this.startDate);
  this.endDate = formatDateTime(this.endDate);
  this.eventLocation = sanitizeHtml(this.eventLocation, sanitize);
  this.message = sanitizeHtml(this.message, sanitize);
  next();
});

module.exports = mongoose.model('Event', EventSchema);
