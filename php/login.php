<?php
    include "connect.php";
    $username = isset($_POST['username'])? $_POST['username']:"";
    $password = isset($_POST['password'])? $_POST['password']:"";
    // echo $username;
    $userQuery = "SELECT * FROM users WHERE phone='$username';";

    $result = $connect->query($userQuery);
    $data = $result->fetch_all(MYSQLI_ASSOC);
    // echo $userQuery;
    if (count($data)<=0) {
        $rt = array('status'=>'failed','errorMsg'=>'账户不存在');
        echo json_encode($rt,JSON_UNESCAPED_UNICODE);
    }else{
        if (md5($data[0]['password'])!=md5($password)) {
            $rt = array('status'=>'failed','errorMsg'=>'密码错误');
            echo json_encode($rt,JSON_UNESCAPED_UNICODE);
        }else{
            $rt = array('status'=>'succeed','errorMsg'=>'登录成功','user_id'=>$data[0]['id']);
            echo json_encode($rt,JSON_UNESCAPED_UNICODE);
        }
    }

    $result->close();

    $connect->close();

?>