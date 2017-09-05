<?php
    include "connect.php";
    $phone = $_GET['phone'];

    $queryStr = "SELECT * FROM users WHERE phone='$phone'";
    $result = $connect->query($queryStr);
    $data = $result->fetch_all();
    if (count($data)>0) {
        $rt = array('status'=>'failed','errorMsg'=>'账户已存在');
        echo json_encode($rt,JSON_UNESCAPED_UNICODE);
    }else{
        $rt = array('status'=>'succeed','errorMsg'=>'');
        echo json_encode($rt,JSON_UNESCAPED_UNICODE);
    }
?>