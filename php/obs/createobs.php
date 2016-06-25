<?php
    include '../db_con.php';
	$report_id = $_REQUEST['report_ids'];
	$obs_id = $_REQUEST['obs_id'];
	$tmp_id = $_REQUEST['tmp_id'];
	
	$pieces = explode(",", $report_id);
	$sql_where = '';
	foreach ($pieces as $value)
		{
			$sql_where .= "report_id = '".$value."' or report_id ='".$value."(mod)' or ";
		};
	$sql_where = substr($sql_where, 0, -3);
	//$query = "update records_vgi set obs_group = '$obs_id' where $sql_where; ";	
	$query ="update records_vgi set obs_group = '$obs_id' where $sql_where; insert into obstacles select * from records_vgi WHERE report_id = '$tmp_id' or report_id ='".$tmp_id."(mod)'; update obstacles set qa_consis = (select avg(qa_consis) from records_vgi where $sql_where), qa_loc_xy = (select avg(qa_loc_xy) from records_vgi where $sql_where), qa_loc_text = (select avg(qa_loc_text) from records_vgi where $sql_where), qa_type = (select avg(qa_type) from records_vgi where $sql_where), qa_duration = (select avg(qa_duration) from records_vgi where $sql_where), qa_urgency = (select avg(qa_urgency) from records_vgi where $sql_where), qa_final = (select avg(qa_final) from records_vgi where $sql_where) where obs_group = '$obs_id'";
	//$query.= "select avg(qa_consis), avg(qa_loc_xy), avg(qa_loc_text), avg(qa_type), avg(qa_duration), avg(qa_urgency), avg(qa_final) from records_vgi where $sql_where;"
	$result = pg_query($db, $query);
	echo $query;
?>
