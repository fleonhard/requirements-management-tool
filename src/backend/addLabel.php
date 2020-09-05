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
$label = utf8_decode($_GET['label']);
$color = $_GET['color'];

$result = mysqli_query($con, "INSERT INTO `requirementstool`.`LABELS` (`groupId`, `color`,`label`) VALUES ('$groupId', '$color', '$label');");
$labelId = mysqli_insert_id($con);
if(isset($reqId)){
    $result = mysqli_query($con, "INSERT INTO `requirementstool`.`REQUIREMENTLABEL` (`reqId`, `labelId`) VALUES ('$reqId', '$labelId');");
}

$query2 = "SELECT * FROM requirementstool.LABELS WHERE id='$labelId';";
$result2 = mysqli_query($con, $query2);

$rows = array();
while($r = mysqli_fetch_assoc($result2)) {
    $rows[] = $r;
}
mysqli_close($con);
echo json_encode(utf8ize($rows));
