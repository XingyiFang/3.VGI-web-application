<?php

$uid = $_REQUEST['uid'];
$lidmin = floatval($_REQUEST['lid'])-0.000000000001;
$lidmax = floatval($_REQUEST['lid'])+0.000000000001;

$db = pg_connect('host=localhost port=5432 dbname=google_markers user=postgres password=qinhan');

$insert_data ="INSERT INTO delete_records_vgi SELECT * FROM records_vgi WHERE use_id='$uid' and lat > $lidmin and lat < $lidmax";
$rs = pg_query($db, $insert_data);

$query = "DELETE from records_vgi where use_id='$uid' and lat > $lidmin and lat < $lidmax";
$result = pg_query($db, $query);
if ($result){
	echo json_encode(array('success'=>true));
} else {
	echo json_encode(array('msg'=>'Some errors occured.'));
}
?>