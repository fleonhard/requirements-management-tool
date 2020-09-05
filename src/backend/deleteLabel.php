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


$result2 = mysqli_query($con, "SELECT r.*, s.oldSystem, s.newSystem, f.funktional, f.nichtfunktional, k.basisfaktor, k.leistungsfaktor, k.begeisterungsfaktor, st.developmentteam, st.admin, st.moduladmin, st.employee, st.studentassistant, st.student
          FROM requirementstool.FUNCTIONAL f, requirementstool.SYSTEM s, requirementstool.REQUIREMENTS r, requirementstool.KANO k, requirementstool.STAKEHOLDER st, requirementstool.REQUIREMENTLABEL rl
          WHERE r.id = s.reqId
          AND rl.labelId = '$id'
          AND rl.reqId = r.id
          AND f.reqId = r.id
          AND k.reqId = r.id
          AND st.reqId = r.id;");

$rows = array();
while($r = mysqli_fetch_assoc($result2)) {
    $rows[] = $r;
}

$result = mysqli_query($con, "DELETE FROM requirementstool.REQUIREMENTLABEL WHERE labelId='$id';");

$result3 = mysqli_query($con, "DELETE FROM requirementstool.LABELS WHERE id='$id';");


mysqli_close($con);
echo json_encode(utf8ize($rows));