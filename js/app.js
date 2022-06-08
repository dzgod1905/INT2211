function addBuyOrder(price, amount, date) {
  var div = document.getElementById("buy-sample");
  const order = document.createElement("li");
  order.innerHTML = div.innerHTML;
  order.style.display = "block";
  order.className = "todo-wrap two";
  order
    .getElementsByClassName("todo-content")[0]
    .getElementsByClassName("todo-name")[0].innerHTML =
    price + " USDT | " + amount;
  order
    .getElementsByClassName("todo-content")[0]
    .getElementsByTagName("a")[0].innerHTML = date;
  document.getElementById("order-book").appendChild(order);
  updateFund();
}

function addSellOrder(price, amount, date) {
  var div = document.getElementById("sell-sample");
  const order = document.createElement("li");
  order.innerHTML = div.innerHTML;
  order.style.display = "block";
  order.className = "todo-wrap fifteen";
  order
    .getElementsByClassName("todo-content")[0]
    .getElementsByClassName("todo-name")[0].innerHTML =
    price + " USDT | " + amount;
  order
    .getElementsByClassName("todo-content")[0]
    .getElementsByTagName("a")[0].innerHTML = date;
  document.getElementById("order-book").appendChild(order);
  updateFund();
}

function updateFund() {
  //TODO: Update fund value and asset value according to the changes in the order book
}
