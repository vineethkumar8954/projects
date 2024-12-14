
document.getElementById('rsvpForm').addEventListener('submit', function(event) {
  event.preventDefault();
  var name = document.getElementById('name').value;
  var email = document.getElementById('email').value;
  var number = document.getElementById('number').value;
  var guests = document.getElementById('guests').value;
  var date = document.getElementById('date').value;
  var time = document.getElementById('time').value
  document.write("YOUR EVENT HAS BEEN BOOKED</br></br>");
  document.write('Name: ' + name+"<br>");
  document.write('Email: ' + email+"<br>");
  document.write('number: ' + number+"<br>");
  document.write('Number of Guests: ' + guests+"<br>");
  document.write('date: ' + date+"<br>");
  document.write('time: ' + time+"<br>");
});