function isTitleValid(){var t=$("#event-title").val();return""!==t}function isTypeValid(){var t=$("#event-type").val();return""!==t}function isHostValid(){var t=$("#event-host").val();return""!==t}function isLocationValid(){var t=$("#event-location").val();return""!==t}function isGuestListValid(){var t=$("#event-guestList").val();return""!==t}function isStartTimeValid(){var t=$("#event-start").val(),i=new Date(t),o=new Date;return o.getTime()<=i.getTime()}function isEndTimeValid(){var t=$("#event-start").val(),i=$("#event-end").val(),o=new Date(t),e=new Date(i);return o.getTime()<e.getTime()}$(document).ready(function(){var t=new Date;t.setMinutes(0);var i=new Date(t);t.setHours(t.getHours()+1),i.setHours(t.getHours()+3),$("#event-start").val(t.toJSON().slice(0,16)),$("#event-end").val(i.toJSON().slice(0,16))});var locationInput=document.getElementById("event-location"),autocomplete=new google.maps.places.Autocomplete(locationInput),titleTooltip=$("#title-tooltip"),typeTooltip=$("#type-tooltip"),hostTooltip=$("#host-tooltip"),locationTooltip=$("#location-tooltip"),guestListTooltip=$("#guestList-tooltip"),startTimeTooltip=$("#startTime-tooltip"),endTimeTooltip=$("#endTime-tooltip");$("#event-title").focusout(function(){isTitleValid()||titleTooltip.css("opacity",1)}),$("#event-title").focusin(function(){titleTooltip.css("opacity",0)}),$("#event-type").focusout(function(){isTypeValid()||typeTooltip.css("opacity",1)}),$("#event-type").focusin(function(){typeTooltip.css("opacity",0)}),$("#event-host").focusout(function(){isHostValid()||hostTooltip.css("opacity",1)}),$("#event-host").focusin(function(){hostTooltip.css("opacity",0)}),$("#event-location").focusout(function(){isLocationValid()||locationTooltip.css("opacity",1)}),$("#event-location").focusin(function(){locationTooltip.css("opacity",0)}),$("#event-guestList").focusout(function(){isGuestListValid()||guestListTooltip.css("opacity",1)}),$("#event-guestList").focusin(function(){guestListTooltip.css("opacity",0)}),$("#event-start").focusout(function(){isStartTimeValid()||startTimeTooltip.css("opacity",1),isEndTimeValid()?endTimeTooltip.css("opacity",0):endTimeTooltip.css("opacity",1)}),$("#event-start").focusin(function(){startTimeTooltip.css("opacity",0)}),$("#event-end").focusout(function(){isEndTimeValid()||endTimeTooltip.css("opacity",1)}),$("#event-end").focusin(function(){endTimeTooltip.css("opacity",0)}),$("#event-submit").click(function(t){var i=!1;isTitleValid()||(i=!0,titleTooltip.css("opacity",1)),isTypeValid()||(i=!0,typeTooltip.css("opacity",1)),isHostValid()||(i=!0,hostTooltip.css("opacity",1)),isLocationValid()||(i=!0,locationTooltip.css("opacity",1)),isGuestListValid()||(i=!0,guestListTooltip.css("opacity",1)),isStartTimeValid()||(i=!0,startTimeTooltip.css("opacity",1)),isEndTimeValid()||(i=!0,endTimeTooltip.css("opacity",1)),i&&t.preventDefault()});