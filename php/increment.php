<?php
    include 'db_con.php';
	// $db = pg_connect('host=localhost port=5432 dbname=google_markers user=postgres password=a7d6m5i4n362J');
	$id =$_REQUEST["x"];
	
	$query = "UPDATE records_vgi SET confirmations = confirmations + 1 WHERE report_id = '$id'";
	$result = pg_query($db, $query);
	echo $id;
?>