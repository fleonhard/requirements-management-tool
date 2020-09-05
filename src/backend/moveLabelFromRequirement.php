<?php

/**
 * Created by PhpStorm.
 * User: Florian
 * Date: 29.04.2017
 * Time: 15:06
 */
include_once 'connection.php';

$reqId = $_GET['reqId'];
$groupId = $_GET['groupId'];
$id = $_GET['labelId'];


$result = mysqli_query($con, "INSERT INTO `requirementstool`.`LABELS` 
(`groupId`, `color`, `label`)
SELECT '$groupId', l.color, l.label
FROM requirementstool.REQUIREMENTLABEL rl, requirementstool.LABELS l
WHERE rl.reqId = '$reqId'
AND l.id = '$id'
AND l.id = rl.labelId;");
$labelId = mysqli_insert_id($con);

$result3 = mysqli_query($con, "UPDATE requirementstool.REQUIREMENTLABEL SET labelId='$labelId' WHERE labelId='$id' AND reqId='$reqId';");

$result2 = mysqli_query($con, "SELECT l.* 
FROM requirementstool.REQUIREMENTLABEL rl, requirementstool.LABELS l
WHERE rl.labelId = '$labelId'
AND rl.labelId = l.id;");

$rows = array();
while($r = mysqli_fetch_assoc($result2)) {
    $rows[] = $r;
}
mysqli_close($con);
echo json_encode(utf8ize($rows));
