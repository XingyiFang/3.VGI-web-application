<?php
    include '../db_con.php';
	// $db = pg_connect('host=localhost port=5432 dbname=google_markers user=postgres password=a7d6m5i4n362J');
	$report_id =$_REQUEST["id"];
	$lat=$_REQUEST["lat"];
	$lng=$_REQUEST["lng"];
	$pos_accu=$_REQUEST["pos_accu"];
	$loc_des =$_REQUEST["loc_des"];
	$obs_des = $_REQUEST["obs_des"];
	$obs_type =$_REQUEST["obs_type"];
	$duration = $_REQUEST["duration"];
	$priority =$_REQUEST["priority"];
	$feedback = $_REQUEST["feedback"];
	$status = $_REQUEST["status"];
	$obs_impact = $_REQUEST["obs_impact"];
	$imagename = $_REQUEST["imagename"];
	$mod_comment = $_REQUEST["mod_comment"];
	$mod_scale = $_REQUEST["mod_scale"];
	$mod_poly =$_REQUEST["poly"];
	$extend_life = $_REQUEST["extend_life"];
	
	if(strpos($report_id,'(mod)') !== false){
		$report_id_new = $report_id;
	}else{
		$report_id_new = $report_id.'(mod)';
	};
	
	if($pos_accu == ''){
		$pos_accu = 0;
	};
	$types = implode(",", $obs_type);
	$query = "UPDATE obstacles
	SET mod_polygon = '$mod_poly', report_id = '$report_id_new', mod_image='$imagename', mod_lat=$lat, mod_lng=$lng, position_acc=$pos_accu, mod_loc_des='$loc_des', mod_obs_type = '$types', mod_duration='$duration', mod_urgency='$priority', status='$status', mod_obs_impact='$obs_impact', mod_flag='false', mod_comment='$mod_comment', mod_scale='$mod_scale', mod_obs_des='$obs_des'
	WHERE report_id = '$report_id';";
	if($extend_life != null or $extend_life!=""){
		echo $extend_life;
		$query .= "update obstacles set close_time = '".$extend_life."' where report_id = '$report_id'";
	}else{
		echo $extend_life;
	};

	//$query .= "update obstacles set close_time = close_time + cast('".$extend_life."' as interval) where report_id = '$report_id'";
	pg_query($db, $query);
	//echo $types
?>