<?php

/**
 * Created by PhpStorm.
 * User: Florian
 * Date: 29.04.2017
 * Time: 15:06
 */
include_once 'connection.php';

$id = $_GET['id'];
$label = utf8_decode($_GET['label']);

$query = "INSERT INTO `requirementstool`.`SUBPOINTS` (`reqId`,`label`) VALUES ('".$id."', '".$label."');";
$result = mysqli_query($con, $query);

$result2 = mysqli_query($con, "SELECT * FROM requirementstool.SUBPOINTS WHERE reqId=".$id.";");

$rows = array();
while($r = mysqli_fetch_assoc($result2)) {
    $rows[] = $r;
}
mysqli_close($con);
echo json_encode(utf8ize($rows));