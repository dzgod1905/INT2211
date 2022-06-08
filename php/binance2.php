<?php
$servername = "localhost";
$username = "root";
$password = "";
$database = "coin";
$conn = mysqli_connect($servername, $username, $password, $database);
$sq = mysqli_query($conn, "select * from user_logs order by id DESC limit 1");
$u;
if (mysqli_num_rows($sq) > 0) {
  $row = mysqli_fetch_array($sq);
  $u = $row['username'];
}
$q = mysqli_query($conn, "select * from datauser where username = '$u' order by time DESC limit 1");
if (mysqli_num_rows($q) > 0) {
  $row = mysqli_fetch_array($q);
  $un = $row['username'];
  $c = $row['capital'];
  $tt = $row['total'];
  $re = $row['money'];
  echo "$un,$c,$tt,$re";
}
