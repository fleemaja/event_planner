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