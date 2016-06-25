<?php
    include 'db_con.php';
	// $db = pg_connect('host=localhost port=5432 dbname=google_markers user=postgres password=a7d6m5i4n362J');
	$id =$_REQUEST["x"];
	$array = $_REQUEST["y"];
	//echo count($array);
	$query = "UPDATE obstacle_vgi SET status = '2' WHERE obstacle_name = '$id';";
	for ($i = 0; $i < count($array); ++$i) {
		echo $array[$i];
		$value_ = trim($array[$i]);
		$query.="UPDATE records_vgi SET status = '5' WHERE report_id = '$value_';";
	};
	echo $query;
	$result = pg_query($db, $query);

	//echo $id;
?>