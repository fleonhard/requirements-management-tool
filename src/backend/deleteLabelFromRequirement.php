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
$reqId = $_GET['reqId'];

$query = "DELETE FROM requirementstool.REQUIREMENTLABEL WHERE reqId='$reqId' AND labelId='$id';";
$result = mysqli_query($con, $query);

$result2 = mysqli_query($con, "SELECT l.* 
FROM requirementstool.REQUIREMENTLABEL rl, requirementstool.LABELS l
WHERE rl.reqId = '$reqId'
AND rl.labelId = l.id;");

$rows = array();
while($r = mysqli_fetch_assoc($result2)) {
    $rows[] = $r;
}
mysqli_close($con);
echo json_encode(utf8ize($rows));