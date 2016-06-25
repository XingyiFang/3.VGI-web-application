<?php
    include 'db_con.php';
	// $db = pg_connect('host=localhost port=5432 dbname=google_markers user=postgres password=a7d6m5i4n362J');
	$query_ = "SELECT report_id from records_vgi where report_id like '%mod%' or use_id like '%Mod%'";
	$result_ = pg_query($db, $query_);
	//$options_ = '<select>';
	while ($row_ = pg_fetch_row($result_)) {
	     //echo $row[0];
		 $options_ .= '<option value="'.$row_[0].'">'.$row_[0].'</option>';
	}
	//$options_ .= '</select>';
	//echo $options_;
?>
