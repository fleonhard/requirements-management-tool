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

$query = "DELETE FROM requirementstool.REQUIREMENTS WHERE id=".$id.";";
$result = mysqli_query($con, $query);

$result2 = mysqli_query($con, "DELETE FROM requirementstool.FUNCTIONAL WHERE reqId=".$id.";");
$result3 = mysqli_query($con, "DELETE FROM requirementstool.KANO WHERE reqId=".$id.";");
$result4 = mysqli_query($con, "DELETE FROM requirementstool.STAKEHOLDER WHERE reqId=".$id.";");
$result5 = mysqli_query($con, "DELETE FROM requirementstool.SYSTEM WHERE reqId=".$id.";");

$query10 = $getAllReqs;
$result10 = mysqli_query($con, $query10);

$rows = array();
while($r = mysqli_fetch_assoc($result10)) {
    $rows[] = $r;
}
mysqli_close($con);
echo json_encode(utf8ize($rows));