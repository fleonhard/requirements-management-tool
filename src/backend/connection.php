<?php header('Access-Control-Allow-Origin: *'); ?>
<?php
/**
 * Created by PhpStorm.
 * User: Florian
 * Date: 29.04.2017
 * Time: 14:43
 */

$con = mysqli_connect('req.herborn-software.com','requirementstool','requirementsAdmin123') or die ("Connection Failed");
mysqli_select_db('requirementstool');

/* check connection */
if (mysqli_connect_errno()) {
    printf("Connect failed: %s\n", mysqli_connect_error());
    exit();
}


function utf8ize($d) {
    if (is_array($d)) {
        foreach ($d as $k => $v) {
            $d[$k] = utf8ize($v);
        }
    } else if (is_string ($d)) {
        return utf8_encode($d);
    }
    return $d;
}

function fetchResult($result){
    $rows = array();
    while($r = mysqli_fetch_assoc($result)) {
        $rows[] = $r;
    }
    return $rows;
}