<?php
$json=array();
    include 'db_con.php';
	
	$val = '(mod)';
	// $db = pg_connect('host=localhost port=5432 dbname=google_markers user=postgres password=a7d6m5i4n362J');
	$query = "select rec.obs_type, obs.status, rec.lat, rec.lng, obs.num_reports, rec.address, obs.obstacle_name, obs.obs_reports, rec.obs_com, rec.image_link from obstacle_vgi obs, records_vgi rec where rec.report_id = obs.obs_temp or rec.report_id = obs.obs_temp|| '(mod)'";
	$result = pg_query($db, $query);
	$rowNumber = pg_num_rows($result);
	while ($row = pg_fetch_row($result)) {
		$categories = array('obstacle_type'=>$row[0],'status'=>$row[1],'lat'=>$row[2], 'lng'=>$row[3], 'num_reports'=>$row[4], 
		'obs_location'=>$row[5], 'obstacle_name'=>$row[6], 'obs_reports'=>$row[7], 'obs_com'=>$row[8], 'image_link'=>$row[9]);
		array_push($json,$categories);	
		//echo json_encode($row);
	}
	echo json_encode($json);
?>