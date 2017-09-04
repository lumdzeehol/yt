<?php

  // [返回商品信息]
  // @param  cate              [商品类别]
  // @param  count             [数量]

    include 'connect.php';

    // $type = isset($_GET['cate'])? "category='".$_GET['cate']."'" : "";
    $type = isset($_GET['cate'])?$_GET['cate']:"";
    $num = isset($_GET['count'])?$_GET['count']:15;
    $count = isset($_GET['count'])? "LIMIT 0,".$_GET['count'] : "LIMIT 0,".'15';
    if ($num < 0){
        $num=0;
    }
    
    /*查询语句*/
    $queryStr = "SELECT * FROM goodslist ".((isset($_GET['cate'])&&strlen($_GET['cate'])>1)?"WHERE category='$type'":"")." $count";
    /*查询结果*/
    $result = $connect->query($queryStr);

    $data = $result->fetch_all();
    $data_arr = [];
    for ($i=0; $i < count($data); $i++) { 
        $data_arr[] = array('id' => $data[$i][0],
                            'name' => $data[$i][1],
                            'des' => $data[$i][2],
                            'price' => $data[$i][3],
                            'cur_price' => $data[$i][4],
                            'imgs' => $data[$i][5],
                            'category' => $data[$i][6]);
    }
    $flag = 0;
    while(count($data_arr)<$num){
        $com = $data_arr;
        $data_arr = array_merge($data_arr,$com);
    }
    $data_arr = array_slice($data_arr, 0 , 15);
    if (!isset($_GET['cate'])||strlen($_GET['cate'])<1) {
        shuffle($data_arr);
    }
    $model = array('data' => $data_arr,
                    'count' => count($data_arr));
    echo json_encode($model,JSON_UNESCAPED_UNICODE);

    // $result->close();

    $connect->close();


?>