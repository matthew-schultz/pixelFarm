//function to display market data
$(function(){
  var $markets = $('#markets');
  $.ajax({
    type: 'GET',
    url: 'https://data.hawaii.gov/resource/b2y9-ab7v.json',
    dataType: 'json',
    success: function(data) {
      $.each(data, function(i, market) {
        if(i <= 8){
          $markets.append('<li><a href="#"><img src="http://famouswonders.com/wp-content/uploads/2010/01/Otavalo-Market.jpg" height="50" width="50">Farmers Market: '+'<h2>'
          + market.farmer_s_market +'</h2>'+ '<p>' +'Island: '+ market.island + 'Location: ' + market.location_1_location + 'State: ' + market. location_1_state +
          'Information: ' + market.location_info +'Phone: '+market.phone+ 'Time: '+market.time +'</p></a></li>');
          $('#markets').listview().listview('refresh');
        }
      });
    }
  });
});
//map function
$(document).ready(function() {
  var locations = [
    ['Ewa Beach', 21.419100, -157.962173],
    ['Windward Mall', 21.42064035000044, -157.80338967099974],
    ['Pearl City', 21.393800202000477, -157.96977976199975],
    ['Salt Lake', 21.34594295700043, -157.90491127999974],
    ['Haleiwa', 21.58948073400046, -158.10290913599974]
  ];
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 11,
    center: new google.maps.LatLng(21.419100, -157.962173),
    mapTypeId: google.maps.MapTypeId.ROADMAP
  });
  var infowindow = new google.maps.InfoWindow();
  var marker, i;
  for (i = 0; i < locations.length; i++) {
    marker = new google.maps.Marker({
      position: new google.maps.LatLng(locations[i][1], locations[i][2]),
      map: map,
      animation: google.maps.Animation.BOUNCE
    });
    google.maps.event.addListener(marker, 'click', (function(marker, i) {
      return function() {
        infowindow.setContent(locations[i][0]);
        infowindow.open(map, marker);
        $('#map').listview().listview('refresh');
      }
    })(marker, i));
  }
});
//function to reset password
function resetBtn(){

  var email = document.getElementById("email").value;
  alert(email);
  var user = new CB.CloudUser();
  CB.CloudUser.resetPassword(email,{
    success: function() {
      alert('Email Sent');
      alert('Reset Password email sent!');
    },
    error: function(error) {
      alert('error occured');
    }
  });

}
//function used to test user login
function loginValidate(){
  var username = document.getElementById("usrname").value;
  var password = document.getElementById("pass").value;
  if(username === '' & password === ''){
    alert('Enter pass/user');
  }else{
    var user = new CB.CloudUser();
    user.set('username', username );
    user.set('password', password );
    user.logIn({
      success: function(user) {
        alert('Thats you!');//Login successfull
      },
      error: function(error) {
        //Error.
        alert('Wrong!')
      }
    });
  }
}
//function to create a new user
function newUserValidate(){

  var username = document.getElementById("username").value;
  var password = document.getElementById("pass").value;
  var confirmPass = document.getElementById("confirm_pass").value;
  var email = document.getElementById("email").value;

  if(username !== '' & password !== '' & confirmPass !== '' & email !== '' ){
    if( password === confirmPass ){
      var user = new CB.CloudUser();
      user.set('username', username );
      user.set('password', password );
      user.set('email', email );
      user.signUp({
        success: function(user) {
          //Registration successfull
          alert('Welcome ' + username)
        },
        error: function(error) {
          //Error in user registration.
          alert('A problem occured');
        }
      });

    }else{
      alert('Passwords don\'t match');
    }
  }else{
    alert('Please Fill out all fields');
  }

}
