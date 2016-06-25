<?php
    include '../db_con.php';
	//$filter = $_REQUEST['filter'];
	// $db = pg_connect('host=localhost port=5432 dbname=google_markers user=postgres password=a7d6m5i4n362J');
	$options = '';
	$options_array = array();
	$query = "select obs_group from records_vgi where obs_group is not null and obs_group != ' ' group by obs_group";
		
	$result = pg_query($db, $query);
	while ($row = pg_fetch_row($result)) {
		$options_value = intval(str_replace("obstacle_","", $row[0]));
		//echo $options_value;
		array_push($options_array, $options_value);
		//echo 12345;
	}
	rsort($options_array);
	foreach ($options_array as $value)
		{
			$op_final_result = "obstacle_$value";
			$options .= '<option value='.$value.'>'.$op_final_result.'</option>';
		};
	$select = '<select id="obs_id">'.$options.'</select>';
	echo $select;
?>
