<?php
    include 'connect.php';
    $phoneNum = $_POST['phone'];
    $password = $_POST['psw'];

    /*$queryStr = "SELECT * FROM users WHERE phone='$phoneNum'";
    
    $result = $connect->query($queryStr);

    $data = $result->fetch_all();
*/
    // $rt = array('status'=>'succeed','errorMsg':'');

    $insertQuery = "INSERT INTO users (id ,phone ,password) VALUES (null ,'$phoneNum' ,'$password')";
    if ($connect->query($insertQuery) === TRUE) {
        // echo json_encode($rt,JSON_UNESCAPED_UNICODE);
        echo "记录插入成功";
    }else{
        echo "Error: ".$insertQuery."<br>".$connect->error;
    }
?>