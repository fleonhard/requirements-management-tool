<?php

/**
 * Created by PhpStorm.
 * User: Florian
 * Date: 29.04.2017
 * Time: 15:06
 */
include_once 'connection.php';

$reqId = $_GET['reqId'];
$id = $_GET['id'];

$result = mysqli_query($con, "INSERT INTO `requirementstool`.`REQUIREMENTLABEL` (`reqId`, `labelId`) VALUES ('$reqId', '$id');");
$labelId = mysqli_insert_id($con);

$result2 = mysqli_query($con, "SELECT l.* 
FROM requirementstool.REQUIREMENTLABEL rl, requirementstool.LABELS l
WHERE rl.id = '$labelId'
AND rl.labelId = l.id;");

$rows = array();
while($r = mysqli_fetch_assoc($result2)) {
    $rows[] = $r;
}
mysqli_close($con);
echo json_encode(utf8ize($rows));
