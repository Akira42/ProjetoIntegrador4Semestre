$('#test').click( function() {
    var myUrl = 'https://estudo-springboo.herokuapp.com/users/';

    var users = [ $.getJSON(myUrl) ];
    
    for (var i = 0; i < users.length; i++){
        
    }


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

