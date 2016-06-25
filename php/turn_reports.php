<?php
    include 'db_con.php';
	$type =$_REQUEST["type"];
	// $db = pg_connect('host=localhost port=5432 dbname=google_markers user=postgres password=a7d6m5i4n362J');
	//$name =$_REQUEST["name"];
	if($type == 'hide'){
		$query = "UPDATE records_vgi SET status = '000'||status";
	}elseif($type == 'show'){
		$query = "UPDATE records_vgi SET status = replace(status, '000', '')";
	}
	//$query = "UPDATE records_vgi SET status = '6'";
	$result = pg_query($db, $query);
	echo $id;
?>