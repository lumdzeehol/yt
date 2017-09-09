<?php
    include "connect.php";
    if (isset($_GET['goodid'])) {
        $goodid = $_GET['goodid']; 
        
        /*查询语句*/
        $queryStr = "SELECT * FROM goodslist WHERE id=$goodid";
        /*查询结果*/
        $result = $connect->query($queryStr);

        $data = $result->fetch_all(MYSQLI_ASSOC);
        if (count($data)>0) {
            echo json_encode(array('data'=>$data[0],'status'=>'succeed'),JSON_UNESCAPED_UNICODE);
        }else{
            echo json_encode(array('data'=>'','status'=>'failed'),JSON_UNESCAPED_UNICODE);
        }
        $connect->close();
    }else{
        die("error");
        $connect->close();
    }

?>