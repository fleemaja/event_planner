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
		
var signupModal = $('#signupModal');
var loginModal = $('#loginModal');
var newEventModal = $('#newEventModal');
	
$('.close').on('click', function() {
	signupModal.hide();
	loginModal.hide();
	newEventModal.hide();
});

$('.signup').on('click', function(e) {
  signupModal.show();
  focusFirstInput(signupModal);
});

$('.login').on('click', function(e) {
  loginModal.show();
  focusFirstInput(loginModal);
});

$('#newEvent').on('click', function(e) {
  newEventModal.show();
  focusFirstInput(newEventModal);
});

function focusFirstInput(modal) {
  var firstInput = modal.find('input[type=text],textarea,select').filter(':visible:first');
  firstInput.focus();
}

$(document).ready(function(){
  
    var startTimeDefault = new Date();
    startTimeDefault.setMinutes(0);
    var endTimeDefault = new Date(startTimeDefault);
    startTimeDefault.setHours(startTimeDefault.getHours() + 1);
    endTimeDefault.setHours(startTimeDefault.getHours() + 3);
    
    $('#event-start').val(startTimeDefault.toJSON().slice(0,16));
    $('#event-end').val(endTimeDefault.toJSON().slice(0,16));
});


var firstPasswordInput = document.querySelector('#password-input');
var secondPasswordInput = document.querySelector('#password-input-2');

/*
I'm using this IssueTracker to help me format my validation messages.
 */
function IssueTracker() {
  this.issues = [];
}
IssueTracker.prototype = {
  add: function (issue) {
    this.issues.push(issue);
  },
  retrieve: function () {
    var message = "";
    switch (this.issues.length) {
      case 0:
        // do nothing because message is already ""
        break;
      case 1:
        message = "Please correct the following issue:\n" + this.issues[0];
        break;
      default:
        message = "Please correct the following issues:\n" + this.issues.join("\n");
        break;
    }
    return message;
  }
};

$('#submit').click(function(e) {
  /*
  Don't forget to grab the input's .value!
   */
  var firstPassword = firstPasswordInput.value;
  var secondPassword = secondPasswordInput.value;

  /*
  Make an issue tracker for each input because some validation messages should
  end up on the first one, some on the second.
   */
  var firstInputIssuesTracker = new IssueTracker();
  var secondInputIssuesTracker = new IssueTracker();

  /*
  This steps through all of the requirements and adds messages when a requirement fails.
  Just checks the first password because the second should be the same when it runs.
   */
  function checkRequirements() {
    if (firstPassword.length < 8) {
      firstInputIssuesTracker.add("fewer than 8 characters");
    } else if (firstPassword.length > 50) {
      firstInputIssuesTracker.add("greater than 50 characters");
    }

    if (!firstPassword.match(/\d/g)) {
      firstInputIssuesTracker.add("missing a number");
    }

    if (!firstPassword.match(/[a-z]/g)) {
      firstInputIssuesTracker.add("missing a lowercase letter");
    }

    if (!firstPassword.match(/[A-Z]/g)) {
      firstInputIssuesTracker.add("missing an uppercase letter");
    }
  };

  /*
  Here's the first validation check. Gotta make sure they match.
   */
  if (firstPassword === secondPassword && firstPassword.length > 0) {
    /*
    They match, so make sure the rest of the requirements have been met.
     */
    checkRequirements();
  } else {
    secondInputIssuesTracker.add("Passwords must match!");
  }

  /*
  Get the validation message strings after all the requirements have been checked.
   */
  var firstInputIssues = firstInputIssuesTracker.retrieve()
  var secondInputIssues = secondInputIssuesTracker.retrieve()

  /*
  Let input.setCustomValidity() do its magic :)
   */
  firstPasswordInput.setCustomValidity(firstInputIssues);
  secondPasswordInput.setCustomValidity(secondInputIssues);
});

var locationInput = document.getElementById('event-location');
var autocomplete = new google.maps.places.Autocomplete(locationInput);
