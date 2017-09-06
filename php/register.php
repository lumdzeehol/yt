<?php
    include 'connect.php';
    $phoneNum = $_POST['phone'];
    $password = ,md5($_POST['psw']);
    $insertQuery = "INSERT INTO users (id ,phone ,password) VALUES (null ,'$phoneNum' ,'$password')";
    if ($connect->query($insertQuery) === TRUE) {
        echo "记录插入成功";
    }else{
        echo "Error: ".$insertQuery."<br>".$connect->error;
    }
?>