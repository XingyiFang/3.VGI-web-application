<?php
    include 'db_con.php';
	//$filter01 = $_GET['filter'];
	$filter = $_REQUEST['filter'];

	//echo $filter;
	//$filter='all reports';
	// $db = pg_connect('host=localhost port=5432 dbname=google_markers user=postgres password=a7d6m5i4n362J');
	$options = '';
	//$options .= '<option value="select" selected="selected">--select a report--</option>';
	$options_array = array();
	$options_array_kelsey = array();
	$options_array_eric = array();
	$options_array_jeff = array();
	if($filter=='all reports'){
		$query = "SELECT * from records_vgi";	
	}elseif($filter=='show new reports (status:1)'){
		$query = "SELECT * from records_vgi where status = '1'";
		
	}elseif($filter=='urgent reports'){
		$query = "SELECT * from records_vgi where priority = 'High' and status = '1'";
	}elseif($filter=='flagged reports'){
		$query = "SELECT * from records_vgi where mod_flag = true";
	}elseif($filter=='status:1,2,3'){
		$query = "SELECT * from records_vgi where status = '1' or status = '2' or status = '3'";
	}elseif($filter=='status:2'){
		$query = "SELECT * from records_vgi where status = '2'";
	}elseif($filter=='status:4'){
		$query = "SELECT * from records_vgi where status = '4'";
	}elseif($filter=='status:3'){
		$query = "SELECT * from records_vgi where status = '3'";
};
	//$test = "";
	$result = pg_query($db, $query);
	$old = array("report_000","(mod)");
	$new = array("","");
	while ($row = pg_fetch_row($result)) {
		$index_ = substr($row[15], 0, 6);		
		if ($index_ == "kelsey"){
			$old = array("kelsey_report_000","(mod)");
			$options_value = intval(str_replace($old,$new, $row[15]));
			array_push($options_array_kelsey, $options_value);
		}elseif($index_ == "jeff_r"){
			$old = array("jeff_report_000","(mod)");
			$options_value = intval(str_replace($old,$new, $row[15]));
			array_push($options_array_jeff, $options_value);
		}elseif($index_ == "eric_r"){
			$old = array("eric_report_000","(mod)");
			$options_value = intval(str_replace($old,$new, $row[15]));
			array_push($options_array_eric, $options_value);
		}else{
			$options_value = str_replace("report_000","", $row[15]);
			$options_value = str_replace("(mod)","", $options_value); 
			//$options_value = intval(str_replace($old,$new, $row[15]));
			//if($options_value ==0){ echo $row[15];}//bug here
			array_push($options_array, $options_value);
		};
		
	}
	rsort($options_array);
	rsort($options_array_kelsey);rsort($options_array_eric);rsort($options_array_jeff);
	foreach ($options_array as $value)
		{
			//$op_final_result = "report_000$value";
			$op_final_result = "report_000".$value;
			$options .= '<option value='.$op_final_result.'>'.$op_final_result.'</option>';
		};
	foreach ($options_array_kelsey as $value)
		{
			//$op_final_result = "report_000$value";
			$op_final_result = "kelsey_report_000$value";
			$options .= '<option value='.$op_final_result.'>'.$op_final_result.'</option>';
		};
	foreach ($options_array_eric as $value)
		{
			//$op_final_result = "report_000$value";
			$op_final_result = "eric_report_000$value";
			$options .= '<option value='.$op_final_result.'>'.$op_final_result.'</option>';
		};
	foreach ($options_array_jeff as $value)
		{
			//$op_final_result = "report_000$value";
			$op_final_result = "jeff_report_000$value";
			$options .= '<option value='.$op_final_result.'>'.$op_final_result.'</option>';
		};
	//$select = '<select name="select-choice-2" id="select-choice-2">'.$options.'</select>';
	//$select = '<select id="rep_id">'.$options.'</select>';
	echo $options;
?>
