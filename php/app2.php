<?php
$t = $_POST['xT'];
$p = $_POST['xP'];
$q = $_POST['xQ'];
$d = $_POST['xD'];
$u = "test";
$sql = mysqli_connect("localhost", "root", "", "coin");
mysqli_query($sql, "INSERT INTO orders (orderid,username,ordertype,price,quantity,timestamp) VALUES (NULL, '$u' , '$t', '$p', '$q', '$d')");
