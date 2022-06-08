function timestampToDate(ts) {
  var s = new Date(ts).toLocaleDateString("vi-VN");
  var t = new Date(ts).toLocaleTimeString("vi-VN");
  return t + " " + s;
}

function addBuyOrder(price, amount, date) {
  amount = parseFloat(amount).toFixed(2);
  var div = document.getElementById("id-sample-buy");
  const order = document.createElement("li");
  order.innerHTML = div.innerHTML;
  order.style.display = "block";
  order.className = "li-order";
  const values = [
    price,
    amount,
    Math.round((price * amount * 100) / 100, 2),
    timestampToDate(date),
  ];
  for (let i = 1; i < 5; ++i) {
    order
      .getElementsByClassName("what-why")[0]
      .getElementsByTagName("div")
    [i].getElementsByClassName("order-content")[0].innerHTML = values[i - 1];
  }
  document.getElementById("order-list").appendChild(order);
}

function addSellOrder(price, amount, date) {
  amount = parseFloat(amount).toFixed(2);
  var div = document.getElementById("id-sample-sell");
  const order = document.createElement("li");
  order.innerHTML = div.innerHTML;
  order.style.display = "block";
  order.className = "li-order";
  const values = [
    price,
    amount,
    Math.round((price * amount * 100) / 100, 2),
    timestampToDate(date),
  ];
  for (let i = 1; i < 5; ++i) {
    order
      .getElementsByClassName("what-why")[0]
      .getElementsByTagName("div")[i]
      .getElementsByClassName("order-content")[0].innerHTML = values[i - 1];
  }
  document.getElementById("order-list").appendChild(order);
}

function updateFund() {
  $.ajax({
    type: "POST",
    url: "php/binance2.php",
    data: {
      user: "test",
    },
    success: function (data) {
      var a = Array(4).fill("");
      var cnt = 0;
      for (let c of data) {
        if (c == ',') ++cnt;
        else a[cnt] += c;
      }
      var n = a[0];
      a[0] = a[1]; a[1] = a[2];
      a[2] = a[3];
      a[0] = parseFloat(a[0]);
      a[1] = parseFloat(a[1]);
      a[2] = parseFloat(a[2]);
      var pct = (a[1] - a[0]) / a[0] * 100;
      var div = document.getElementById("info-board");
      var info = document.createElement("div");
      info.innerHTML = div.innerHTML;
      info.style.display = "block";
      info.className = "board";
      info.id = "info-board";
      const values = [
        "$" + a[0],
        "$" + a[1],
        (Math.round(pct * 1000) / 1000) + "%",
        "$" + a[2],
      ];
      document.getElementById("name").innerHTML=n;
      document.getElementById("fund").innerHTML=values[0];
      document.getElementById("value").innerHTML=values[1];
      document.getElementById("profit").innerHTML=values[2];
      document.getElementById("remaining").innerHTML=values[3];
    }
  });
}

function updateDiv() {
  $("#order-list").load(window.location.href + " #order-list");
}

function goHome() {
  console.log(123);
  window.location.href = "home.html";
}