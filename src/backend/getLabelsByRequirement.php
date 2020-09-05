<?php

/**
 * Created by PhpStorm.
 * User: Florian
 * Date: 29.04.2017
 * Time: 15:06
 */
include_once 'connection.php';
include_once 'queries.php';

$id = $_GET['id'];

$result = mysqli_query($con, "SELECT l.* 
FROM requirementstool.REQUIREMENTLABEL rl, requirementstool.LABELS l
WHERE rl.reqId = '$id'
AND rl.labelId = l.id;");

$rows = array();
while($r = mysqli_fetch_assoc($result)) {
    $rows[] = $r;
}
mysqli_close($con);
echo json_encode(utf8ize($rows));