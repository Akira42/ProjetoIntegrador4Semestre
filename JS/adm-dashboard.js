$( document ).ready(function() {
  var APIusers = 'https://four-dev.herokuapp.com/users';
  var APIprods = 'https://four-dev.herokuapp.com/produtos';

  //listagem usuarios
  function getData() {
    xhr.open("GET", APIusers, true );
    $.getJSON(APIusers, function(data){

      $("#table-head").empty();
      $("#table-head").append('<tr class=""> <td></td><td class="">ID</td><td class="">TIPO</td><td class="">NOME</td><td class="">EMAIL</td><td class="">CPF</td><td class="">TELEFONE</td><td class="">ESTADO</td></tr>')

      $("#dynamic-table").empty();

      $.each(data, function(k, v) {
          $("#dynamic-table").append('<tr id="'+v.id+'" class=""><td><input rowid="'+v.id+'" class="table_select" type="checkbox"></td><td class="">'+v.id+'</td><td class="">'+v.tipo+'</td><td class="">'+v.nome+'</td><td class="">'+v.email+'</td><td class="">'+v.cpf+'</td><td class="">'+v.telefone+'</td><td class="">'+v.endereco+'</td></tr>')
      });
    });
  }

  getData();

  //listagem produto
  function getProductData() {
    xhr.open("GET", APIprods, true );
    $.getJSON(APIprods, function(data){

      $("#table-head").empty();
      $("#table-head").append('<tr class=""> <td></td><td class="">ID</td><td class="">NOME</td><td class="">DESCRIÇÃO</td><td class="">PREÇO</td><td class="">QUANTIDADE</td></tr>')

      $("#dynamic-table").empty();

      $.each(data, function(k, v) {
          $("#dynamic-table").append('<tr id="'+v.id+'" class=""><td><input rowid="'+v.id+'" class="table_select" type="checkbox"></td><td class="">'+v.id+'</td><td class="">'+v.nome+'</td><td class="">'+v.descricao+'</td><td class="">'+v.preco+'</td><td class="">'+v.quantidade+'</td></tr>')
      });
    });
  }

  //add user
  $('#adicionar').click( function() {
    var tipo = Number( $("#tipo-user").val() );
    var name = $("#name").val();
    var email = $("#email").val();
    var telefone = Number( $("#phone").val() );
    var nascimento = $("#nascimento").val();
    var senha = $("#senha").val();
    var cpf = $("#cpf").val();
    var estado = $("#estado-user").val();
    var status = $("#userStatus").val();
  
    data = JSON.stringify({
        "cpf": cpf,
        "nome" : name,
        "telefone": telefone,
        "email": email,
        "dataNascimento" : nascimento,
        "tipoUsuario": tipo,
        "senha": senha,
        "endereco" : estado,
        "status" : true
    });
  
    xhr.addEventListener("readystatechange", function() {
      if(this.readyState === 4) {
        console.log(this.responseText);
      }
    });
  
    xhr.open("POST", APIusers, true);
    xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
    xhr.setRequestHeader("Content-Type", "application/json");
  
    xhr.send(data);

    setTimeout(function () {
      $("#dynamic-table").empty();

      getData();
    }, 500);
  });

  //delete user
  $('#delete').click( function() {
    $('.table_select').each(function() {
      if ( $(this).is(":checked") ) {
  
        let selectedID = $(this).attr('rowid');
          
        xhr.open("DELETE", APIusers + '/' + selectedID, false);
        xhr.send();
  
        let rowToDelete = $(this).parent().parent();
        $(rowToDelete).replaceWith('');
      }
    });
  });

  //muda menu option
  $("#menu-dashboard-list li").click( function(){
    $("#menu-dashboard-list li").removeClass('selected');
    $(this).addClass('selected');

    if( $(this).is('#menu-users') ) {
      getData();
    }

    if( $(this).is('#menu-prods') ) {
      getProductData();
    }
  });

});
