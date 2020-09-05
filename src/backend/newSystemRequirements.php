<?php

/**
 * Created by PhpStorm.
 * User: Florian
 * Date: 29.04.2017
 * Time: 15:06
 */
include_once 'connection.php';

$query = "SELECT r.*, s.oldSystem, s.newSystem, f.funktional, f.nichtfunktional, k.basisfaktor, k.leistungsfaktor, k.begeisterungsfaktor, st.developmentteam, st.admin, st.moduladmin, st.employee, st.studentassistant, st.student
          FROM requirementstool.FUNCTIONAL f, requirementstool.SYSTEM s, requirementstool.REQUIREMENTS r, requirementstool.KANO k, requirementstool.STAKEHOLDER st
          WHERE r.id = s.reqId
          AND f.reqId = r.id
          AND k.reqId = r.id
          AND st.reqId = r.id
          AND s.newSystem = 1;";

$result = mysqli_query($con, $query);

$rows = array();
while($r = mysqli_fetch_assoc($result)) {
    $rows[] = $r;
}
mysqli_close($con);
echo json_encode(utf8ize($rows));