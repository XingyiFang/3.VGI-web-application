<?php
$json=array();
    include '../db_con.php';
	// $db = pg_connect('host=localhost port=5432 dbname=google_markers user=postgres password=a7d6m5i4n362J');
	//$query = "SELECT * from obstacles";
	$query = "select obs_type, status, lat, lng, close_time, address, obs_group, qa_final, obs_com, image_link from obstacles";
	$result = pg_query($db, $query);
	$rowNumber = pg_num_rows($result);
	while ($row = pg_fetch_row($result)) {
		$categories = array('obstacle_type'=>$row[0],'status'=>$row[1],'lat'=>$row[2], 'lng'=>$row[3], 'close_time'=>$row[4], 
		'obs_location'=>$row[5], 'obstacle_name'=>$row[6], 'qa_final'=>$row[7], 'obs_com'=>$row[8], 'image_link'=>$row[9]);
		array_push($json,$categories);		
	}
	echo json_encode($json);
?>