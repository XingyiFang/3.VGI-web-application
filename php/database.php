<?php
    include 'db_con.php';
	// $db = pg_connect('host=localhost port=5432 dbname=google_markers user=postgres password=a7d6m5i4n362J');
	$uid =$_REQUEST["uid"];
	$address=$_REQUEST["z"];
	$latV=$_REQUEST["x"];
	$lngV=$_REQUEST["y"];
	$lcom=$_REQUEST["lcom"];
	$obs_type =$_REQUEST["t"];
	$obs_impact = $_REQUEST["impact"];
	$obs_com =$_REQUEST["ocom"];
	$duration = $_REQUEST["dur"];
	$priority =$_REQUEST["pri"];
	$feedback = $_REQUEST["feedback"];
	$finalTime = $_REQUEST["f"];
	$reportTime = $_REQUEST["reportTime"];
	$report_id = $_REQUEST["report_id"];
	$image_name = $_REQUEST["image"];
	$comple_score = $_REQUEST["comple_score"];
	
	if($duration == "Long (> 7 days)"){
		$close_time = '120 days';
	}else if($duration == "Medium (1-7 days)"){
		$close_time = '7 days';
	}else if($duration == "Short (< 1 day)"){
		$close_time = '24 hours';
	};
		//"Medium (1-7 days)"
	//"Short (< 1 day)"

	//$bcheck = FALSE;
	//38.86184969619081,-77.34224801086418 !! 38.811573506408614,-77.28714470886223
	$types = implode(",", $obs_type);
	if ($latV < 38.86184969619081 && $latV > 38.811573506408614 && $lngV < -77.28714470886223 && $lngV > -77.34224801086418){
		//$bcheck = true;
	$query = "INSERT INTO records_vgi (use_id, address, lat, lng, location_com, obs_type, obs_com, duration, priority, feedback, submit_time, status, obs_group, obs_time, image_link, report_id, 
	report_score, boundary_chek, obs_impact)
	VALUES ('".$uid."','".$address."',".$latV.",".$lngV.",
	'".$lcom."','".$types."','".$obs_com."','".$duration."','".$priority."',
	'".$feedback."','".$finalTime."','1', ' ', '".$reportTime."', '".$image_name."', '".$report_id."', ".$comple_score.", TRUE ,'".$obs_impact."');";
	$query .= "update records_vgi set close_time = to_timestamp(obs_time, 'MM/DD/YYYY HH24:MI:SS') + cast('".$close_time."' as interval) where report_id = '$report_id'";
	}else{
		//$bcheck = false;
	$query = "INSERT INTO records_vgi (use_id, address, lat, lng, location_com, obs_type, obs_com, duration, priority, feedback, submit_time, status, obs_group, obs_time, image_link, report_id, 
	report_score, boundary_chek, obs_impact)
	VALUES ('".$uid."','".$address."',".$latV.",".$lngV.",
	'".$lcom."','".$types."','".$obs_com."','".$duration."','".$priority."',
	'".$feedback."','".$finalTime."','1', ' ', '".$reportTime."', '".$image_name."', '".$report_id."', ".$comple_score.", FALSE ,'".$obs_impact."');";
	$query .= "update records_vgi set close_time = to_timestamp(obs_time, 'MM/DD/YYYY HH24:MI:SS') + cast('".$close_time."' as interval) where report_id = '$report_id'";
	};

	pg_query($db, $query);
?>