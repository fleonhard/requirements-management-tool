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

$query = "UPDATE requirementstool.FUNCTIONAL SET funktional=0, nichtfunktional=1 WHERE reqId=".$id.";";
$result = mysqli_query($con, $query);

$query2 = getAllReqsQuery($id);
$result2 = mysqli_query($con, $query2);

$rows = array();
while($r = mysqli_fetch_assoc($result2)) {
    $rows[] = $r;
}
mysqli_close($con);
echo json_encode(utf8ize($rows));