<?php
$json=array();
    $db = pg_connect('host=localhost port=5432 dbname=google_markers user=postgres password=a7d6m5i4n362J');
	$query = "select * from obstacle_vgi obs, records_vgi rec where obs.obs_temp = rec.report_id";
	$result = pg_query($db, $query);
	$rowNumber = pg_num_rows($result);
	while ($row = pg_fetch_row($result)) {
		$categories = array('obstacle_type'=>$row[16],'status'=>$row[5],'lat'=>$row[13], 'lng'=>$row[14], 'num_reports'=>$row[6], 
		'obs_location'=>$row[12], 'obs_image'=>$row[25],'obstacle_name'=>$row[23], 'obs_reports'=>$row[10], 'obs_com'=>$row[17]);
		array_push($json,$categories);		
	}
	echo json_encode($json);
?>