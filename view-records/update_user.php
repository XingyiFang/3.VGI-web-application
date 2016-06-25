<?php
$report_id = $_REQUEST['report_id'];
$reviewer_id = $_REQUEST['reviewer_id'];
$reviewer_com = $_REQUEST['reviewer_com'];
$status = $_REQUEST['status'];
$db = pg_connect('host=localhost port=5432 dbname=google_markers user=postgres password=a7d6m5i4n362J');

$sel_reid = "select reviewer_id, reviewer_com from records_vgi where report_id='$report_id'";
$sel_result = pg_query($db, $sel_reid);
$reid = pg_fetch_array($sel_result, 0, PGSQL_NUM);

if ($reviewer_id==""){
	$sql = "update records_vgi set status='$status' where report_id='$report_id'";
	$result = pg_query($db, $sql);
}else{
	if (is_null($reid[0]) || $reid[0] == " ") {
		$sql = "update records_vgi set status='$status', reviewer_id='$reviewer_id', reviewer_com='".$reviewer_id.":".$reviewer_com."' where report_id='$report_id'";
		$result = pg_query($db, $sql);
	}else{
		$sql = "update records_vgi set status='$status', reviewer_id='".$reid[0].", ".$reviewer_id."', reviewer_com='".$reid[1]."; ".$reviewer_id.":".$reviewer_com."' where report_id='$report_id'";
		$result = pg_query($db, $sql);
	};
}
	
if ($result){
	echo json_encode(array('success'=>true));
} else {
	echo json_encode(array('msg'=>'Some errors occured.'));
}
?>