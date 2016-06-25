<?php
    include 'db_con.php';
	// $db = pg_connect('host=localhost port=5432 dbname=google_markers user=postgres password=a7d6m5i4n362J');
	$report_id =$_REQUEST["id"];
	$query = "DELETE FROM mod_data WHERE report_id = '$report_id'; INSERT into mod_data SELECT * FROM records_vgi WHERE report_id = '$report_id'; DELETE FROM records_vgi WHERE report_id = '$report_id'";
	pg_query($db, $query);
?>
