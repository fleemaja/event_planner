// event form guest list field
var Guest = 3;
$('#add-guest').click(function(e) {
  $('#event-guestList').append('<input type="text" class="form-control form-guestList" placeholder="Guest ' + Guest + '" style="margin-right: 4px;" >');
  Guest += 1;
});

$('#event-guestList').change(function() {
  var guests = [];
  $(".form-guestList").each(function() {
    var guestVal = $(this).val().replace(/\,/g, '&#44;');
    guests.push(guestVal);
  });
  $('#guestList').val(guests);
});


// set default start and end times on event form
$(document).ready(function(){
    var startTimeDefault = new Date();
    startTimeDefault.setMinutes(0);
    var endTimeDefault = new Date(startTimeDefault);
    startTimeDefault.setHours(startTimeDefault.getHours() + 1);
    endTimeDefault.setHours(startTimeDefault.getHours() + 3);
    
    $('#event-start').val(startTimeDefault.toJSON().slice(0,16));
    $('#event-end').val(endTimeDefault.toJSON().slice(0,16));
});


// google places autocomplete for location field
var locationInput = document.getElementById('event-location');
var autocomplete = new google.maps.places.Autocomplete(locationInput);


// event form pre-submit validation
var titleTooltip = $('#title-tooltip');
var typeTooltip = $('#type-tooltip');
var hostTooltip = $('#host-tooltip');
var locationTooltip = $('#location-tooltip');

$('#event-title').focusout(function() {
  if (!isTitleValid()) {
    titleTooltip.css('opacity', 1);
  }
});

$('#event-title').focusin(function() {
  titleTooltip.css('opacity', 0);
});

function isTitleValid() {
  var title = $('#event-title').val();
  return title === "" ? false : true;
}

$('#event-type').focusout(function() {
  if (!isTypeValid()) {
    typeTooltip.css('opacity', 1);
  }
});

$('#event-type').focusin(function() {
  typeTooltip.css('opacity', 0);
});

function isTypeValid() {
  var type = $('#event-type').val();
  return type === "" ? false : true;
}

$('#event-host').focusout(function() {
  if (!isHostValid()) {
    hostTooltip.css('opacity', 1);
  }
});

$('#event-host').focusin(function() {
  hostTooltip.css('opacity', 0);
});

function isHostValid() {
  var host = $('#event-host').val();
  return host === "" ? false : true;
}

$('#event-location').focusout(function() {
  if (!isLocationValid()) {
    locationTooltip.css('opacity', 1);
  }
});

$('#event-location').focusin(function() {
  locationTooltip.css('opacity', 0);
});

function isLocationValid() {
  var location = $('#event-location').val();
  return location === "" ? false : true;
}

$('#event-submit').click(function(e) {
  var preventDefault = false;
  
  if (!isTitleValid()) {
    preventDefault = true;
    titleTooltip.css('opacity', 1);
  }
  
  if (!isTypeValid()) {
    preventDefault = true;
    typeTooltip.css('opacity', 1);
  }
  
  if (!isHostValid()) {
    preventDefault = true;
    hostTooltip.css('opacity', 1);
  }
  
  if (!isLocationValid()) {
    preventDefault = true;
    locationTooltip.css('opacity', 1);
  }
  
  if (preventDefault) {
    e.preventDefault();
  }
});