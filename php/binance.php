
<?php
    $servername = "localhost";
    $username = "root";
    $password = "";
    $database = "coin";
    $conn = mysqli_connect($servername, $username, $password,$database);

    $lasttime=$_POST['lasttime'];
    $id=$_POST['id'];
    $price=$_POST['price'];
    $qty=$_POST['qty'];
    $isBuyerMaker=$_POST['isBuyerMaker'];
    $isBestMatch=$_POST['isBestMatch'];
    $quoteQty=$_POST['quoteQty'];
    $check=mysqli_query($conn, "select * from data where data_ID='$id'");
    if(mysqli_num_rows($check)>0) echo 'fail';
    else
    {
        mysqli_query($conn,"INSERT INTO data(data_ID,data_price,data_qty,data_quoteqty,data_time,data_isBuyerMaker,data_isBestMatch) VALUES ('$id','$price','$qty','$quoteQty','$lasttime','$isBuyerMaker','$isBestMatch')");
        $sq = mysqli_query($conn, "select * from user_logs order by id DESC limit 1");
        $u;
        if (mysqli_num_rows($sq) > 0) {
          $row = mysqli_fetch_array($sq);
          $u = $row['username'];
        }
        $q = mysqli_query($conn,"select * from datauser where username = '$u' order by time DESC limit 1");  
        if(mysqli_num_rows($q)>0) {
            while($row=mysqli_fetch_array($q)) {
                $r = 0.01;
                $o = 100;$stop = 10;
                $m = $row['money'];
                $t = $row['target'];
                $a = $row['amount'];
                $v = $row['value'];
                $c = $row['capital'];
                $tt = $row['total'];
                $esp = 1/1000000;
                
                if($tt/$c > (100 + $stop)/100) break;
                $p = $price;
                if($a < $esp) {
                    //echo "success";
                    $t = $m;
                    $a = ($m / $o) / $p;
                    $v = $p;
                    $tt = $m;
                    $m -= $a * $v;
                    mysqli_query($conn,"INSERT INTO datauser (id, username, money, target, amount, value, capital, total, time) VALUES (NULL, '$u', '$m', '$t', '$a', '$v', '$c', '$tt', '$lasttime')");
                    echo "1,$p,$a,$lasttime";
                } else if($p > $v * (100 + $r)/100) {
                    echo "0,$p,$a,$lasttime";
                    $m += $a * $p;
                    $t = $m;
                    $a = 0;$v = $p;
                    $tt = $m;
                    mysqli_query($conn,"INSERT INTO datauser (id, username, money, target, amount, value, capital, total, time) VALUES (NULL, '$u', '$m', '$t', '$a', '$v', '$c', '$tt', '$lasttime')");
                } else if($p < $v * (100 - $r)/100) {
                    $mn = ($t - $m - $a*$p*(100+$r)/100) / ($r/100);
                    $ttt = ($t - $m - $a*$p*(100+$r)/100);
                    $mmm = ($r/100);
                    if($mn <= $m) {
                        $am = $mn / $p;
                        echo "1,$p,$am,$lasttime";
                        $m -= $mn;
                        $a += $mn / $p;
                        $v = $p;
                        $tt = $m + $a*$v;
                    } else {
                        echo "0,$p,$a,$lasttime";
                        $m += $a * $p;
                        $t = $m;
                        $a = 0;$v = $p;
                        $tt = $m;
                    }
                    mysqli_query($conn,"INSERT INTO datauser (id, username, money, target, amount, value, capital, total, time) VALUES (NULL, '$u', '$m', '$t', '$a', '$v', '$c', '$tt', '$lasttime')");
                }
            }
        } 

    }
