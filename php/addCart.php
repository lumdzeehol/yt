<?php
    include "connect.php";
    if (isset($_POST['goodid']) && isset($_POST['userid'])&&isset($_POST['count'])) {
        $good_id = $_POST['goodid'];
        $user_id = $_POST['userid'];
        $count = $_POST['count'];
        $searchQuery = "SELECT * FROM cart WHERE good_id=$good_id";
        $resSearch = $connect->query($searchQuery);
        $data = $resSearch->fetch_all(MYSQLI_ASSOC);
        if (count($data)>0) {
            $ori_count = $data[0]['count'];
            $cur_count = $ori_count + $count;
            $insertQuery = "UPDATE cart SET count=$cur_count WHERE good_id=$good_id";
            $resInsert = $connect->query($insertQuery);
            echo json_encode(array('status'=>'succeed'));
        }else{
            $insertQuery = "INSERT INTO cart (id,good_id,user_id,count) VALUES (null,$good_id,$user_id,$count)";
            $resInsert = $connect->query($insertQuery);
            if (!$resInsert) {
                echo json_encode(array('status'=>'failed'));
                die( json_encode("无法插入数据:".$connect->error));
            }
        }
    }else{
         echo json_encode(array('status'=>'failed')); 
    }
    $connect->close();
?>