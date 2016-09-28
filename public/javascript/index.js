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

var locationInput = document.getElementById('event-location');
var autocomplete = new google.maps.places.Autocomplete(locationInput);



// signup page front-end validation
var nameTooltip = $('#name-tooltip');
var emailTooltip = $('#email-tooltip');

var passwordOneTooltip = $('#password-1-tooltip');
var passwordTwoTooltip = $('#password-2-tooltip');

$('#name-input').focusout(function() {
  if (!isNameValid()) {
    nameTooltip.css('opacity', 1);
  }
});

$('#name-input').focusin(function() {
  nameTooltip.css('opacity', 0);
});

$('#email-input').focusout(function() {
  if (!isEmailValid()) {
    emailTooltip.css('opacity', 1);
  }
});

$('#email-input').focusin(function() {
  emailTooltip.css('opacity', 0);
});

function isNameValid() {
  var name = $('#name-input').val();
  return name === "" ? false : true;
}

function isEmailValid() {
  var email = $('#email-input').val();
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

var firstPasswordInput = $('#password-input');
var secondPasswordInput = $('#password-input-2');

firstPasswordInput.focusout(function() {
  var issues = passwordIssues();
  if (!isPasswordValid(issues)) {
    passwordOneTooltip.html('<span class="fa fa-exclamation"></span>' + issues);
    passwordOneTooltip.css('opacity', 1);
  }
});

firstPasswordInput.focusin(function() {
  passwordOneTooltip.css('opacity', 0);
});

secondPasswordInput.focusout(function() {
  var issues = secondPasswordIssues();
  if (!isPasswordValid(issues)) {
    passwordTwoTooltip.html('<span class="fa fa-exclamation"></span>' + issues);
    passwordTwoTooltip.css('opacity', 1);
  }
});

secondPasswordInput.focusin(function() {
  passwordTwoTooltip.css('opacity', 0);
});

function passwordIssues() {
  var firstPassword = firstPasswordInput.val();
  var firstInputIssuesTracker = new IssueTracker();
  
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
  
  return firstInputIssuesTracker.retrieve();
}

function secondPasswordIssues() {
  var firstPassword = firstPasswordInput.val();
  var secondPassword = secondPasswordInput.val();
  var secondInputIssuesTracker = new IssueTracker();
  
  if (firstPassword !== secondPassword) {
    secondInputIssuesTracker.add("Passwords must match!");
  }
  
  return secondInputIssuesTracker.retrieve();
}

function isPasswordValid(issues) {
  return issues.length > 0 ? false : true;
}

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
        message = "Please correct the following issues:\n" + this.issues.join(", ");
        break;
    }
    return message;
  }
};

$('#submit').click(function(e) {
  var preventDefault = false;
  
  if (!isNameValid()) {
    preventDefault = true;
    nameTooltip.css('opacity', 1);
  }
  
  if (!isEmailValid()) {
    preventDefault = true;
    emailTooltip.css('opacity', 1);
  }
  
  var issues = passwordIssues();
  if (!isPasswordValid(issues)) {
    preventDefault = true;
    passwordOneTooltip.html('<span class="fa fa-exclamation"></span>' + issues);
    passwordOneTooltip.css('opacity', 1);
  }
  
  var verificationIssues = secondPasswordIssues();
  if (!isPasswordValid(verificationIssues)) {
    preventDefault = true;
    passwordTwoTooltip.html('<span class="fa fa-exclamation"></span>' + verificationIssues);
    passwordTwoTooltip.css('opacity', 1);
  }
  
  if (preventDefault) {
    e.preventDefault();
  }
})