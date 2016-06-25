<?php
	include 'db_con.php';
	$json=array();
	$report_id=$_GET['id'];
    // $db = pg_connect('host=localhost port=5432 dbname=google_markers user=postgres password=a7d6m5i4n362J');
	$query = "SELECT * from records_vgi WHERE report_id = '$report_id'";
	$result = pg_query($db, $query);
	$rowNumber = pg_num_rows($result);
	while ($row = pg_fetch_row($result)) {
		$categories = array('use_id'=>$row[0],'address'=>$row[1],'lat'=>$row[2], 'lng'=>$row[3], 'location_com'=>$row[4], 
		'obs_type'=>$row[5], 'obs_com'=>$row[6], 'duration'=>$row[7], 'priority'=>$row[8],
		'feedback'=>$row[9], 'submit_time'=>$row[10],'status'=>$row[11], 'report_id'=>$row[15], 'image_link'=>$row[14], 'obstacle_type'=>$row[5]);
		array_push($json,$categories);		
	}
	echo json_encode($json);
?>