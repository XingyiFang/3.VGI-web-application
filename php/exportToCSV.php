<?php
    include 'db_con.php';
	// $db = pg_connect('host=localhost port=5432 dbname=google_markers user=postgres password=a7d6m5i4n362J');
	$query = "COPY records_vgi TO 'C:\inetpub\wwwroot\images\obstacles.csv' DELIMITER ',' CSV HEADER;";
	$result = pg_query($db, $query); 
?>