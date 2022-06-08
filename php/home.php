<?php
$type = $_POST['type'];
$sql = mysqli_connect("localhost", "root", "", "coin");
if($type==1)
{
    $q = mysqli_query($sql,"SELECT * from user_logs ORDER BY ID DESC LIMIT 1");
    if (mysqli_num_rows($q) > 0) {
    $row = mysqli_fetch_array($q);
    $u = $row['username'];
    $sta = $row['status'];
    echo "$u,$sta";
  }
}
else if($type==0)
{
    $u = $_POST['u'];
    mysqli_query($sql,"INSERT INTO user_logs (ID,username,status) VALUES (NULL,'$u','0')");
    echo "success";
}