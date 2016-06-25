<?php
    include 'db_con.php';
	// $db = pg_connect('host=localhost port=5432 dbname=google_markers user=postgres password=a7d6m5i4n362J');
	$name =$_REQUEST["name"];
	$query = "UPDATE obstacle_vgi SET status = '5' WHERE obstacle_name = '$name'";
	$result = pg_query($db, $query);
	echo $id;
?>