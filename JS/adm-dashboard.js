$( document ).ready(function() {
  var API = 'https://four-dev.herokuapp.com/users';

  //fetches data and builds the table with it
  function getData() {
    xhr.open("GET", API, true );
    $.getJSON(API, function(data){

      $.each(data, function(k, v) {
          $("#dynamic-table").append('<tr id="'+v.id+'" class=""><td><input rowid="'+v.id+'" class="table_select" type="checkbox"></td><td class="">'+v.id+'</td><td class="">'+v.type+'</td><td class="">'+v.nome+'</td><td class="">'+v.email+'</td><td class="">'+v.cpf+'</td><td class="">'+v.telefone+'</td><td class="">'+v.state+'</td></tr>')
      });
    });
  }

  getData();

  $('#delete').click( function() {
    $('.table_select').each(function() {
        if ( $(this).is(":checked") ) {

          let selectedID = $(this).attr('rowid');
        
          xhr.open("DELETE", API + selectedID, false);
          xhr.send();

          let rowToDelete = $(this).parent().parent();
          $(rowToDelete).replaceWith('');
        }
    });
  });

  // $('#delete').click( function() {
  //     $.each( $('.table_select'), function() {
        
  //         if ( $(this).is(":checked") ) {

  //           let selectedID = $(this).attr('rowid');
          
  //           xhr.open("DELETE", API + selectedID);

  //           xhr.send();

  //           let rowToDelete = $(this).parent().parent();
  //           $(rowToDelete).replaceWith('');
  //         }

  //     });
  // });

  $('#adicionar').click( function() {
    var name = $("#name").val();
    var email = $("#email").val();
    var telefone = $("#telefone").val();
    var senha = $("#senha").val();
    var cpf = $("#cpf").val();
  
    data = JSON.stringify({
        "name" : name,
        "email": email,
        "telefone": telefone,
        "cpf": cpf,
        "senha": senha
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

  $('#btn-login-avancar').click( function() {
    
    data = JSON.stringify({
      "login":"vitorakira42@gmail.com",
      "senha":"123456"
    });

    // xhr.open("GET", "https://four-dev.herokuapp.com/login", true );
    // xhr.setRequestHeader("Content-Type", "application/json");
    
    // console.log(data);

    // xhr.send(data);

    let dataReceived = ""; 
    fetch("https://four-dev.herokuapp.com/login", {
        credentials: "same-origin",
        mode: "cors",
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: data
    })
        .then(resp => {
            if (resp.status === 200) {
                return resp.json()
            } else {
                console.log("Status: " + resp.status)
                return Promise.reject("server")
            }
        })
        .then(dataJson => {
            dataReceived = JSON.parse(dataJson)
        })
        .catch(err => {
            if (err === "server") return
            console.log(err)
        })

    console.log(`Received: ${dataReceived}`)   
  });

});
