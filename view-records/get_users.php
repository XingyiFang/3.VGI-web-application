<?php
	$page = isset($_POST['page']) ? intval($_POST['page']) : 1;
	$rows = isset($_POST['rows']) ? intval($_POST['rows']) : 10;
	$offset = ($page-1)*$rows;
	$result = array();

	$db = pg_connect('host=localhost port=5432 dbname=google_markers user=postgres password=qinhan');
	
	
	$query = "SELECT * from records_vgi";
	$rs = pg_query($db, $query);
	//$row = pg_fetch_row($rs);
	$rowNumber = pg_num_rows($rs);
	$result["total"] = $rowNumber;

	$query2 = "SELECT * from records_vgi limit $rows offset $offset";
	$rs = pg_query($db, $query2);
	
	$items = array();
	
	while ($row = pg_fetch_object($rs)){
		array_push($items, $row);	
	}
	$result["rows"] = $items;
	echo json_encode($result);

?>