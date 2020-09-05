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
$description = utf8_decode($_GET['description']);
$votes = $_GET['votes'];
$oldSystem = $_GET['oldSystem'];
$newSystem = $_GET['newSystem'];
$admin = $_GET['admin'];
$moduladmin = $_GET['moduladmin'];
$employee = $_GET['employee'];
$developmentteam = $_GET['developmentteam'];
$studentassistant = $_GET['studentassistant'];
$student = $_GET['student'];
$basisfaktor = $_GET['basisfaktor'];
$leistungsfaktor = $_GET['leistungsfaktor'];
$begeisterungsfaktor = $_GET['begeisterungsfaktor'];
$funktional = $_GET['funktional'];
$nichtfunktional = $_GET['nichtfunktional'];
$groupId = $_GET['groupId'];
$storypoints = $_GET['storypoints'];
$done = $_GET['done'];
$watching = $_GET['watching'];
$banned = $_GET['banned'];

$query = "UPDATE requirementstool.REQUIREMENTS SET description='$description', votes='$votes', groupId='$groupId', storypoints='$storypoints', done='$done', watching='$watching', banned='$banned' WHERE id='$id';";
$result = mysqli_query($con, $query);

$result2 = mysqli_query($con, "UPDATE requirementstool.FUNCTIONAL SET funktional='$funktional', nichtfunktional= '$nichtfunktional' WHERE reqId='$id');");
$result3 = mysqli_query($con, "UPDATE requirementstool.KANO SET basisfaktor='$basisfaktor', leistungsfaktor='$leistungsfaktor', begeisterungsfaktor='$begeisterungsfaktor' WHERE reqId='$id');");
$result4 = mysqli_query($con, "UPDATE requirementstool.STAKEHOLDER SET moduladmin='$moduladmin', employee='$employee', studentassistant='$studentassistant', developmentteam='$developmentteam', admin='$admin', student='$student' WHERE reqId='$id');");
$result5 = mysqli_query($con, "UPDATE requirementstool.SYSTEM SET oldSystem = '$oldSystem', newSystem = '$newSystem' WHERE reqId = '$id';");

$result10 = mysqli_query($con, getAllReqsQuery($id));

$rows = array();
while($r = mysqli_fetch_assoc($result10)) {
    $rows[] = $r;
}
mysqli_close($con);
echo json_encode(utf8ize($rows));