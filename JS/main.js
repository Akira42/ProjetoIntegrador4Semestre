$(function() {                              
  //makes header-spacer the same height as header
  var headerHeight = $("#header").height();
  $("#header-spacer").css("height", headerHeight)

  //adds shadow to header when scrolled
  $(document).scroll(function() {
      $("#header").toggleClass('scrolled', $(this).scrollTop() > 20);
  });
});

var xhr = new XMLHttpRequest();

$('input#submitButton').click( function() {
    var myUrl = 'https://estudo-springboo.herokuapp.com/users';

    var name = $("#name").val();
    var email = $("#email").val();
    var phone = $("#phone").val();
    var password = $("#password").val();

    var data = JSON.stringify({
        "name" : name,
        "email": email,
        "phone": phone,
        "password": password
    });

    console.log(data);

    xhr.withCredentials = false;

    xhr.addEventListener("readystatechange", function() {
      if(this.readyState === 4) {
        console.log(this.responseText);
      }
    });

    xhr.open("POST", myUrl);
    xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.send(data);
});

$('input#get').click( function() {
    var myUrl = 'https://estudo-springboo.herokuapp.com/users/';

    let id = $("#getId").val();

    $.getJSON(myUrl + id, function(data) {
        $("#displayId").append(data.id);
        $("#displayName").append(data.name);
        $("#displayEmail").append(data.email);
        $("#displayPhone").append(data.phone);
        $("#displayPassword").append(data.password);
    });
});

$('input#delete').click( function() {
  var myUrl = 'https://estudo-springboo.herokuapp.com/users/';

  var id = $("#id").val();

  xhr.withCredentials = false;

  xhr.addEventListener("readystatechange", function() {
    if(this.readyState === 4) {
      console.log(this.responseText);
    }
  });

  xhr.open("DELETE", myUrl + id, true );
  xhr.send();
});
