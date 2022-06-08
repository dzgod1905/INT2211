function check(t) {
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
      console.log(data);
      if(a[1]==1) signin(a[0]);
      if(t==2) logout(a[0]);
      if(t==3) 
      {
        if(a[1]==1) window.location.href = "app2.html";
        else window.location.href = "home.html";
      }
    },
  });
}

function signin(Username){
  console.log(Username);
  document.getElementById('loginButton').style.display='none';
  document.getElementById('usernameText').innerHTML="Hello "+Username;
  document.getElementById('username').style.display='inline-block';
  document.getElementById('logoutButton').style.display='inline-block';
  document.getElementById('logoutText').innerHTML='Logout';
}

function logout(Username){
  document.getElementById('loginButton').style.display='inline-block';
  document.getElementById('logoutButton').style.display='none';
  document.getElementById('username').style.display='none';
  $.ajax({
    url: "php/home.php",
    type: "POST",
    data: {type:0,u:Username},
    success: function (data) {
      console.log(data);
    },
  });
}