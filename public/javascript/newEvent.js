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
var guestListTooltip = $('#guestList-tooltip');
var startTimeTooltip = $('#startTime-tooltip');
var endTimeTooltip = $('#endTime-tooltip');

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

$('#event-guestList').focusout(function() {
  if (!isGuestListValid()) {
    guestListTooltip.css('opacity', 1);
  }
});

$('#event-guestList').focusin(function() {
  guestListTooltip.css('opacity', 0);
});

function isGuestListValid() {
  var guestList = $('#event-guestList').val();
  return guestList === "" ? false : true;
}

$('#event-start').focusout(function() {
  if (!isStartTimeValid()) {
    startTimeTooltip.css('opacity', 1);
  }
  
  if (!isEndTimeValid()) {
    endTimeTooltip.css('opacity', 1);
  } else {
    endTimeTooltip.css('opacity', 0);
  }
});

$('#event-start').focusin(function() {
  startTimeTooltip.css('opacity', 0);
});

function isStartTimeValid() {
  var startStr = $('#event-start').val();
  var startTime = new Date(startStr);
  var nowTime = new Date();
  
  return nowTime.getTime() <= startTime.getTime();
}

$('#event-end').focusout(function() {
  if (!isEndTimeValid()) {
    endTimeTooltip.css('opacity', 1);
  }
});

$('#event-end').focusin(function() {
  endTimeTooltip.css('opacity', 0);
});

function isEndTimeValid() {
  var startStr = $('#event-start').val();
  var endStr = $('#event-end').val();
  
  var startTime = new Date(startStr);
  var endTime = new Date(endStr);
  
  return startTime.getTime() < endTime.getTime();
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
  
  if (!isGuestListValid()) {
    preventDefault = true;
    guestListTooltip.css('opacity', 1);
  }
  
  if (!isStartTimeValid()) {
    preventDefault = true;
    startTimeTooltip.css('opacity', 1);
  }
  
  if (!isEndTimeValid()) {
    preventDefault = true;
    endTimeTooltip.css('opacity', 1);
  }
  
  if (preventDefault) {
    e.preventDefault();
  }
});