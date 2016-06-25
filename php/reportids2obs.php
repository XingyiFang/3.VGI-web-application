<?php
    include 'db_con.php';
	//$filter = $_REQUEST['filter'];
	// $db = pg_connect('host=localhost port=5432 dbname=google_markers user=postgres password=a7d6m5i4n362J');
	$options = '';
	$options_array = array();
	$query = "select report_id from records_vgi where obs_group is null or obs_group = ' '";
		
	$result = pg_query($db, $query);
	$old = array("report_000","(mod)");
	$new = array("","");
	while ($row = pg_fetch_row($result)) {
		$options_value = intval(str_replace($old,$new, $row[0]));
		array_push($options_array, $options_value);
	}
	rsort($options_array);
	foreach ($options_array as $value)
		{
			$op_final_result = "report_000$value";
			$options .= '<option value='.$value.'>'.$op_final_result.'</option>';
		};
	$select = '<select id="rep_id" multiple size="35">'.$options.'</select>';
	echo $select;
?>
