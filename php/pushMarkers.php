<?php
$json=array();
    include 'db_con.php';
	// $db = pg_connect('host=localhost port=5432 dbname=google_markers user=postgres password=a7d6m5i4n362J');
	$query = "SELECT * from records_vgi";
	$result = pg_query($db, $query);
	$rowNumber = pg_num_rows($result);
	while ($row = pg_fetch_row($result)) {
		$categories = array('use_id'=>$row[0],'address'=>$row[1],'lat'=>$row[2], 'lng'=>$row[3], 'location_com'=>$row[4], 
		'obs_type'=>$row[5], 'obs_com'=>$row[6], 'duration'=>$row[7], 'priority'=>$row[8], 'obs_group'=>$row[12],
		'feedback'=>$row[9], 'submit_time'=>$row[10],'status'=>$row[11], 'obs_time'=>$row[13], 'report_id'=>$row[15], 'image_link'=>$row[14], 'obs_impact'=>$row[25], 'qa_final'=>$row[44], 'mod_image'=>$row[33], 'mod_lat'=>$row[26], 'mod_lng'=>$row[27]);
		array_push($json,$categories);		
	}
	echo json_encode($json);
?>