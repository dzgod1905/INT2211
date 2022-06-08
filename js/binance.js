window.onload = function () {
  updateFund();
  var auto = setTimeout(function () {
    autoRefresh();
  }, 60);

  async function add() {
    const url = "https://api.binance.com/api/v3/trades?symbol=";
    const coinname = "BTCUSDT";
    let api_url = url.concat(coinname);
    const response = await fetch(api_url);
    const data = await response.json();

    var lasttimedata = data[data.length - 1].time;
    lasttimedata = parseInt(lasttimedata);

    var iddata = data[data.length - 1].id;
    iddata = parseInt(iddata);

    var pricedata = data[data.length - 1].price;
    pricedata = parseFloat(pricedata);

    var qtydata = data[data.length - 1].qty;
    qtydata = parseFloat(qtydata);

    var isBuyerMakerdata = data[data.length - 1].isBuyerMaker;
    isBuyerMakerdata = Number(isBuyerMakerdata);

    var isBestMatchdata = data[data.length - 1].isBestMatch;
    isBestMatchdata = Number(isBestMatchdata);

    var quoteQtydata = data[data.length - 1].quoteQty;
    quoteQtydata = parseFloat(quoteQtydata);

    $.ajax({
      type: "POST",
      url: "php/binance.php",
      data: {
        lasttime: lasttimedata,
        id: iddata,
        price: pricedata,
        qty: qtydata,
        isBuyerMaker: isBuyerMakerdata,
        isBestMatch: isBestMatchdata,
        quoteQty: quoteQtydata,
      },
      success: function (data) {
        var a = Array(4).fill("");
        var cnt = 0;
        for (let c of data) {
          if (c == ",") ++cnt;
          else a[cnt] += c;
        }
        a[0] = parseFloat(a[0]);
        a[1] = parseFloat(a[1]);
        a[2] = parseFloat(a[2]);
        a[3] = parseInt(a[3]);
        console.log(data);
        if (a[0] == 1) {
          addBuyOrder(a[1], a[2], a[3]);
        }
        if (a[0] == 0) {
          addSellOrder(a[1], a[2], a[3]);
        }
        updateFund();
      },
    });
  }

  function autoRefresh() {
    clearTimeout(auto);
    add();
    auto = setTimeout(function () {
      autoRefresh();
    }, 6000);
  }
};
