<?php
    include 'db_con.php';
	$number_type =$_REQUEST["type"];
	if ($number_type == "call"){
		$query = "SELECT confirmations from mod_data where report_id = 'totalnumber'";
		$result = pg_query($db, $query);

		while ($row = pg_fetch_row($result)) {
		  echo $row[0];
		}
	}elseif($number_type  == "add"){
		$query = "SELECT confirmations from mod_data where report_id = 'totalnumber'";
		$result = pg_query($db, $query);

		while ($row = pg_fetch_row($result)) {
		  echo $row[0];
		};
		
		$query_add = "UPDATE mod_data SET confirmations = confirmations + 1 WHERE report_id = 'totalnumber'";
		$result_add = pg_query($db, $query_add);
		
	}
	// $db = pg_connect('host=localhost port=5432 dbname=google_markers user=postgres password=a7d6m5i4n362J');

?>