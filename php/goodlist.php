<?php
    include "connect.php";

    if (isset($_GET['page'])) {
        $page = $_GET['page'];
        $count = 20;
        $selectQuery = "SELECT * FROM goodslist";

        $result = $connect->query($selectQuery);
        $data = $result->fetch_all(MYSQLI_ASSOC);
        $data_copy = $data;
        $data_copy_2 = $data;
        $datanew = array_merge($data,$data_copy,$data_copy_2);
        $datanew = array_slice($datanew,($page - 1)*$count,$count);
        $rt = array('data'=>$datanew,'count'=>count($datanew));
        echo json_encode($rt,JSON_UNESCAPED_UNICODE);
    }
?>