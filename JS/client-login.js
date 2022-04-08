// $("#btn-login-avancar").click(function () {
//   $("#label-login-email, #input-login-email").addClass("hidden");

//   $("#label-login-senha, #input-login-senha, #go-back").removeClass("hidden");
// });

// $("#go-back").click(function () {
//   $("#label-login-email, #input-login-email").removeClass("hidden");

//   $("#label-login-senha, #input-login-senha, #go-back").addClass("hidden");
// });


//login 
$('#btn-login-avancar').click(function () {
  var loginEmail = $('#input-login-email').val();

  var loginSenha = $('#input-login-senha').val();

  data = JSON.stringify({
    "login": loginEmail,
    "senha": loginSenha
  });

  let dataReceived = "";
  fetch("https://four-dev.herokuapp.com/login", {
    credentials: "same-origin",
    mode: "cors",
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: data
  })
    .then(resp => {
      if (resp.status === 200 && loginEmail != '' && loginSenha != '') {
        window.location.href = "./adm-dashboard.html";
        return resp.json();        
      } else {
        console.log("Status: " + resp.status)
        $('#warning').toggleClass("warningShow");
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