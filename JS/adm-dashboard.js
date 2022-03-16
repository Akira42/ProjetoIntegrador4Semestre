$( document ).ready(function() {
  var API = 'https://estudo-springboo.herokuapp.com/users/';

  //fetches data and builds the table with it
  function getData() {
    xhr.open("GET", API, true );
    $.getJSON(API, function(data){
      var n1 = 0;
      $.each(data, function(k, v) {
          $("#dynamic-table").append('<tr id="'+v.id+'" class=""><td><input rowid="'+v.id+'" class="table_select" type="checkbox"></td><td class="">'+v.id+'</td><td class="">'+v.type+'</td><td class="">'+v.name+'</td><td class="">'+v.email+'</td><td class="">'+v.cpf+'</td><td class="">'+v.phone+'</td><td class="">'+v.state+'</td></tr>')
      });
    });
  }

  getData();

  $('#delete').click( function() {


      $.each( $('.table_select'), function() {

        
          if ( $(this).is(":checked") ) {
            let selectedID = $(this).attr('rowid');
          
            setTimeout(function () {
              xhr.addEventListener("readystatechange", function() {
                if(this.readyState === 4) {
                  console.log(this.responseText);
                }
              });
              xhr.open("DELETE", API + selectedID, true );
              xhr.send();
            }, 500);
  
            let rowToDelete = $(this).parent().parent();
            setTimeout(function () {
              $(rowToDelete).replaceWith('');
            }, 500);
          }

      });
  });


  $('#adicionar').click( function() {
    var name = $("#name").val();
    var email = $("#email").val();
    var phone = $("#phone").val();
    var password = $("#password").val();
  
    data = JSON.stringify({
        "name" : name,
        "email": email,
        "phone": phone,
        "password": password
    });
  
    xhr.addEventListener("readystatechange", function() {
      if(this.readyState === 4) {
        console.log(this.responseText);
      }
    });
  
    xhr.open("POST", API, true);
    xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
    xhr.setRequestHeader("Content-Type", "application/json");
  
    xhr.send(data);

    setTimeout(function () {
      $("#dynamic-table").replaceWith('<tbody id="dynamic-table"></tbody>');

      getData();
    }, 500);
  });

});