$( document ).ready(function() {
  var APIusersGet = 'https://four-dev.herokuapp.com/users/findAll';
  var APIusersPost = 'https://four-dev.herokuapp.com/users/postUser';
  var APIusersPut = 'https://four-dev.herokuapp.com/users/putUser';
  var APIprods = ' https://four-dev.herokuapp.com/produtos/';

  //listagem usuarios
  function getData() {
    xhr.open("GET", APIusersGet, true );
    $.getJSON(APIusersGet, function(data){

      $("#table-head").empty();
      $("#table-head").append('<tr class=""> <td></td><td class="">ID</td><td class="">TIPO</td><td class="">NOME</td><td class="">EMAIL</td><td class="">CPF</td><td class="">TELEFONE</td><td class="">ESTADO</td><td class="">STATUS</td></tr>')

      $("#dynamic-table").empty();

      $.each(data, function(k, v) {
          $("#dynamic-table").append('<tr id="'+v.id+'" class=""><td><input rowid="'+v.id+'" class="table_select" type="checkbox"></td><td class="">'+v.id+'</td><td class="">'+v.tipoUsuario+'</td><td class="">'+v.nome+'</td><td class="">'+v.email+'</td><td class="">'+v.cpf+'</td><td class="">'+v.telefone+'</td><td class="">'+v.endereco+'</td><td class="">'+v.status+'</td></tr>')
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
  
    xhr.open("POST", APIusersPost, true);
    xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
    xhr.setRequestHeader("Content-Type", "application/json");
  
    xhr.send(data);

    setTimeout(function () {
      $("#dynamic-table").empty();

      getData();
    }, 500);
  });

  //update user
  $('#atualizar').click( function() {
    $('.table_select').each(function() {
      if ( $(this).is(":checked") ) {
  
        let selectedID = $(this).attr('rowid');

        $.getJSON(APIusersPut, function(data){

          xhr.open("GET", APIusersPut + '/' + selectedID, false);
          dataNew = JSON.stringify({
            "cpf": data.cpf,
            "nome" : data.nome,
            "telefone": data.telefone,
            "email": data.email,
            "dataNascimento" : data.dataNascimento,
            "tipoUsuario": data.tipoUsuario,
            "senha": data.senha,
            "endereco" : data.estado,
            "status" : false
          });
            
          xhr.open("PUT", APIusersPut + '/' + selectedID, false);
          xhr.send(dataNew);
  
        });

        //let rowToDelete = $(this).parent().parent();
        // $(rowToDelete).replaceWith('');
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



      $("#but_upload").click(function(){
  
          var fd = new FormData();
          var files = $('#file')[0].files;
          
          // Check file selected or not
          if(files.length > 0 ){
             fd.append('file',files[0]);
  
             $.ajax({
                url: 'https://four-dev.herokuapp.com/produtos/postImgs/idProd/1',
                type: 'post',
                data: fd,
                contentType: false,
                processData: false,
                success: function(response){
                   if(response != 0){
                      $("#img").attr("src",response); 
                      $(".preview img").show(); // Display image element
                   }else{
                      alert('file not uploaded');
                   }
                },
             });
          }else{
             alert("Please select a file.");
          }
      });
});