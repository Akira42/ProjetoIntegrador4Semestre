  $("#btn-login-avancar").click( function(){
    $("#label-login-email, #input-login-email").addClass("hidden");

    $("#label-login-senha, #input-login-senha, #go-back").removeClass("hidden");
  });

  $("#go-back").click( function(){
    $("#label-login-email, #input-login-email").removeClass("hidden");

    $("#label-login-senha, #input-login-senha, #go-back").addClass("hidden");
  });