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
$reqId = $_GET['$reqId'];

$query = "DELETE FROM requirementstool.SUBPOINTS WHERE id='$id';";
$result = mysqli_query($con, $query);

$result10 = mysqli_query($con, "SELECT * FROM requirementstool.SUBPOINTS WHERE reqId='$id';");

$rows = array();
while($r = mysqli_fetch_assoc($result10)) {
    $rows[] = $r;
}
mysqli_close($con);
echo json_encode(utf8ize($rows));