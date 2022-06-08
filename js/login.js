
$(document).ready(function () {
  $("#submit-login").submit(function (e) {
    e.preventDefault();
    const username = document.querySelector("#input-username").value;
    const password = document.querySelector("#input-password").value;
    $.ajax({
      url: "php/login.php",
      type: "POST",
      data: { u: username, p: password },
      success: function (data) {
        const alerts = document.querySelectorAll(".alert");
        console.log(data);
        if (data === "success") {
          userName=username;
          document.location.href = 'home.html';

        } else {
          document.querySelector("#authentication-failed").style.display =
            "block";
        }
      },
    });
  });

  $("#submit-register").submit(function (e) {
    e.preventDefault();
    const name = document.querySelector("#input-name-register").value;
    const username = document.querySelector("#input-username-register").value;
    const password = document.querySelector("#input-password-register").value;
    const cpassword = document.querySelector("#input-cpassword-register").value;
    const money = document.querySelector("#input-money-register").value;
    $.ajax({
      url: "php/signup.php",
      type: "POST",
      data: { u: username, p: password, cp: cpassword, n: name, m: money },
      success: function (data) {
        const alerts = document.querySelectorAll(".alert");
        alerts.forEach(function (alert) {
          alert.style.display = "none";
        });
        console.log(data);
        if (data === "success") toggleForm();
        if (data === "uae")
          document.querySelector("#username-duplicate").style.display = "block";
        if (data === "pdm")
          document.querySelector("#cpassword-failed").style.display = "block";
        if (data === "pts")
          document.querySelector("#password-short").style.display = "block";
      },
    });
  });
});

const toggleForm = () => {
  const inputs = document.querySelectorAll(":not(input[type=submit])");
  inputs.forEach(function (input) {
    input.value = "";
  });
  const container = document.querySelector(".container");
  container.classList.toggle("active");
};

function has_login(t) {
  console.log(1);
  $.ajax({
    url: "php/home.php",
    type: "POST",
    data: {type:1},
    success: function (data) {
      var a = Array(2).fill("");
      var cnt=0;
      for (let c of data) {
        if (c == ",") ++cnt;
        else a[cnt] += c;
      }
      if(t==4)
      {
        if(a[1]==1) window.location.href = "home.html";
      }
    },
  });
}