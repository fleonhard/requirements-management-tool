<?php

/**
 * Created by PhpStorm.
 * User: Florian
 * Date: 29.04.2017
 * Time: 15:06
 */
include_once 'connection.php';
include_once 'queries.php';

$groupId = $_GET['groupId'];

$result = mysqli_query($con, getReqsByGroup($groupId));

$rows = array();
while($r = mysqli_fetch_assoc($result)) {
    $rows[] = $r;
}
mysqli_close($con);
echo json_encode(utf8ize($rows));