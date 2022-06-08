<?php
$u = $_POST['u'];
$n = $_POST['n'];
$p = $_POST['p'];
$cp = $_POST['cp'];
$m = $_POST['m'];
$sql = mysqli_connect("localhost", "root", "", "coin");
$exist = mysqli_query($sql, "select * from users where username='$u'");

if($p != $cp) {
    echo "pdm";
} else if (strlen($p) < 6) {
    echo "pts";
} else if (mysqli_num_rows($exist) > 0) {
    echo "uae";
} else {
    mysqli_query($sql, "insert into users values(null, '$u', '$p', '$n','0')");
    mysqli_query($sql, "insert into datauser (id, username, money, target, amount, value, capital, total, time) VALUES (NULL, '$u', '$m', '$m', 0, 0, '$m', '$m', 0)");
    echo "success";
}
