<?php
    include 'db_con.php';
	//QA_consis QA_loc_xy QA_loc_text QA_type QA_duration QA_urgency QA_comple QA_mod
	$report_id =$_REQUEST["id"];
	$QA_consis=$_REQUEST["QA_consis"];
	$QA_loc_xy=$_REQUEST["QA_loc_xy"];
	$QA_loc_text=$_REQUEST["QA_loc_text"];
	$QA_type =$_REQUEST["QA_type"];
	$QA_duration = $_REQUEST["QA_duration"];
	$QA_urgency = $_REQUEST["QA_urgency"];
	$QA_final = $_REQUEST["QA_final"];
	$QA_total = $_REQUEST["QA_total"];
	$QA_image = $_REQUEST["QA_image"];
	
	$query = "UPDATE records_vgi
	SET qa_consis = $QA_consis, qa_loc_xy = $QA_loc_xy, qa_loc_text=$QA_loc_text, qa_type = $QA_type, qa_image =$QA_image, qa_duration=$QA_duration, qa_urgency=$QA_urgency, qa_final=$QA_final, qa_total = $QA_total 
	WHERE report_id = '$report_id';";
	pg_query($db, $query);
	echo $report_id
?>