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

$query = "INSERT INTO `requirementstool`.`REQUIREMENTS` (description, votes, groupId, storypoints, done, watching, banned) VALUES ('".$description."', '".$votes."', '".$groupId."', '".$storypoints."', '".$done."', '".$watching."', '".$banned."');";
$result = mysqli_query($con, $query);
$id = mysqli_insert_id($con);

$result2 = mysqli_query($con, "INSERT INTO `requirementstool`.`FUNCTIONAL` (reqId, funktional, nichtfunktional) VALUES ('".$id."', '".$funktional."', '".$nichtfunktional."');");
$result3 = mysqli_query($con, "INSERT INTO `requirementstool`.`KANO` (reqId, basisfaktor, leistungsfaktor, begeisterungsfaktor) VALUES ('".$id."', '".$basisfaktor."', '".$leistungsfaktor."', '".$begeisterungsfaktor."');");
$result4 = mysqli_query($con, "INSERT INTO `requirementstool`.`STAKEHOLDER` (reqId, moduladmin, employee, studentassistant, developmentteam, admin, student) VALUES ('".$id."', '".$moduladmin."', '".$employee."', '".$studentassistant."', '".$developmentteam."', '".$admin."', '".$student."');");
$result5 = mysqli_query($con, "INSERT INTO `requirementstool`.`SYSTEM` (reqId, oldSystem, newSystem) VALUES ('".$id."', '".$oldSystem."', '".$newSystem."');");

$query10 = getAllReqsQuery($id);
$result10 = mysqli_query($con, $query10);

$rows = array();
while($r = mysqli_fetch_assoc($result10)) {
    $rows[] = $r;
}
mysqli_close($con);
echo json_encode(utf8ize($rows));