<?php
    include "connect.php";
    if (isset($_GET['userid'])) {   
        $userid = $_GET['userid'];
        $selectQuery = "SELECT * FROM cart WHERE user_id=$userid";
        $result = $connect->query($selectQuery);
        $data = $result->fetch_all(MYSQLI_ASSOC);
        $dataArr = array();
        for ($i=0; $i < count($data); $i++) { 
            $dataArr[] = $data[$i];
        }
        $rtn = array('data'=>$dataArr,'count'=>count($data));
        echo json_encode($rtn);
    }
?>