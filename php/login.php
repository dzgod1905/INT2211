<?php
$u = $_POST['u'];
$p = $_POST['p'];
$sql = mysqli_connect("localhost", "root", "", "coin");
$q = mysqli_query($sql, "select * from users where username='$u' and password='$p'");
if(mysqli_num_rows($q) > 0) {
    echo "success";
    mysqli_query($sql,"INSERT INTO user_logs (ID,username,status) VALUES (NULL,'$u','1')");
    mysqli_query($sql,"insert into login values(null, '$u')");
} else echo "fail";
