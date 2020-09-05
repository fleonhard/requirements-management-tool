<?php
/**
 * Created by PhpStorm.
 * User: Florian
 * Date: 08.06.2017
 * Time: 20:25
 */

$getAllReqs = "SELECT r.*, s.oldSystem, s.newSystem, f.funktional, f.nichtfunktional, k.basisfaktor, k.leistungsfaktor, k.begeisterungsfaktor, st.developmentteam, st.admin, st.moduladmin, st.employee, st.studentassistant, st.student
          FROM requirementstool.FUNCTIONAL f, requirementstool.SYSTEM s, requirementstool.REQUIREMENTS r, requirementstool.KANO k, requirementstool.STAKEHOLDER st
          WHERE r.id = s.reqId
          AND f.reqId = r.id
          AND k.reqId = r.id
          AND st.reqId = r.id;";

function getAllReqsQuery($idParam){
    return "SELECT r.*, s.oldSystem, s.newSystem, f.funktional, f.nichtfunktional, k.basisfaktor, k.leistungsfaktor, k.begeisterungsfaktor, st.developmentteam, st.admin, st.moduladmin, st.employee, st.studentassistant, st.student
          FROM requirementstool.FUNCTIONAL f, requirementstool.SYSTEM s, requirementstool.REQUIREMENTS r, requirementstool.KANO k, requirementstool.STAKEHOLDER st
          WHERE r.id = s.reqId
          AND f.reqId = r.id
          AND k.reqId = r.id
          AND st.reqId = r.id
          AND r.id = ".$idParam.";";
}
function getReqsByGroup($groupId){
    return "SELECT r.*, s.oldSystem, s.newSystem, f.funktional, f.nichtfunktional, k.basisfaktor, k.leistungsfaktor, k.begeisterungsfaktor, st.developmentteam, st.admin, st.moduladmin, st.employee, st.studentassistant, st.student
          FROM requirementstool.FUNCTIONAL f, requirementstool.SYSTEM s, requirementstool.REQUIREMENTS r, requirementstool.KANO k, requirementstool.STAKEHOLDER st
          WHERE r.id = s.reqId
          AND f.reqId = r.id
          AND k.reqId = r.id
          AND st.reqId = r.id
          AND r.groupId = ".$groupId.";";
}