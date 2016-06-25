<?php
    include 'db_con.php';
	
	// $db = pg_connect('host=localhost port=5432 dbname=google_markers user=postgres password=a7d6m5i4n362J');
	$query = "SELECT image_link, report_id FROM records_vgi where status = '1'";
	$result = pg_query($db, $query);
	//echo $result;
	while ($row = pg_fetch_row($result)) {
		$final_name = '';
		$image_names = $row[0];
		$report_id = $row[1];
		if(is_null($image_names)||$image_names ==''){
		}else{
			$images = explode(";", $image_names);
			$i = 0;
			foreach($images as $image){
				$i++;
				if(empty($image)){
					
				}else{
					$withoutExt = preg_replace("/\\.[^.\\s]{3,4}$/", "", $image);
					$change = str_replace($withoutExt,"",$image);
					$final_name.= $report_id."($i)".$change.";";
					rename("../../images/".$image,"../../images/".$report_id."($i)".$change);
					//echo $withoutExt, "----------", $report_id, "<br/>";
					//echo $image, "----------", $report_id, "<br/>";
					};
			};
			echo $final_name, "----------", $report_id, "<br/>";
			
			//$finals = str_replace("(1)","",$image_names);
			$query_add = "UPDATE records_vgi 
			SET image_link = '$final_name'
			WHERE report_id = '$report_id';";
			pg_query($db, $query_add);
		};
		

	};
?>
