<?php
    include 'db_con.php';
	// $db = pg_connect('host=localhost port=5432 dbname=google_markers user=postgres password=a7d6m5i4n362J');
	$query = "SELECT * from obstacle_vgi";
	$options_array = array();
	
	$result = pg_query($db, $query);
	$options = '';
	while ($row = pg_fetch_row($result)) {
		$options_value = intval(str_replace("obstacle_","", $row[1]));
		array_push($options_array, $options_value);
		
		//$options .= '<option value="'.$row[1].'">'.$row[1].'</option>';
	};
	rsort($options_array);
	foreach ($options_array as $value)
		{
			$op_final_result = "obstacle_$value";
			$options .= '<option value='.$op_final_result.'>'.$op_final_result.'</option>';
		};
	$select = '<select id="obs_id">'.$options.'</select>';
	echo $select;
	//echo $options;
?>
