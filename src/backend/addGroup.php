<?php

/**
 * Created by PhpStorm.
 * User: Florian
 * Date: 29.04.2017
 * Time: 15:06
 */
include_once 'connection.php';

$label = utf8_decode($_GET['label']);

$query = "INSERT INTO `requirementstool`.`GROUPS` (`label`) VALUES ('".$label."');";
$result = mysqli_query($con, $query);

$query2 = "SELECT * FROM requirementstool.GROUPS;";
$result2 = mysqli_query($con, $query2);

$rows = array();
while($r = mysqli_fetch_assoc($result2)) {
    $rows[] = $r;
}
mysqli_close($con);
echo json_encode(utf8ize($rows));
