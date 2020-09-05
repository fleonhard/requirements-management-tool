<?php

/**
 * Created by PhpStorm.
 * User: Florian
 * Date: 29.04.2017
 * Time: 15:06
 */
include_once 'connection.php';
include_once 'queries.php';

$id = $_GET['reqId'];
$groupId = $_GET['groupId'];

$query = "UPDATE requirementstool.REQUIREMENTS SET groupId=".$groupId." WHERE id=".$id.";";
$result = mysqli_query($con, $query);

$query2 = getAllReqsQuery($id);
$result2 = mysqli_query($con, $query2);

$rows = array();
while($r = mysqli_fetch_assoc($result2)) {
    $rows[] = $r;
}
mysqli_close($con);
echo json_encode(utf8ize($rows));