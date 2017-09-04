<?php
    /*配置参数*/
    $servername = 'localhost';
    $username = 'root';
    $password = '';
    $database = 'yintai_database';

    /*连接数据库*/
    $connect = new mysqli($servername,$username,$password,$database);

    /*是否连接成功*/
    if ($connect->connect_errno) {
        die('连接失败'.$connect->connect_error);
    }

    $connect->set_charset('utf8');

?>