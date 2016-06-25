<?php
    include 'db_con.php';
	$obs_id=$_REQUEST['id'];
	// $db = pg_connect('host=localhost port=5432 dbname=google_markers user=postgres password=a7d6m5i4n362J');
	$query = "SELECT * from obstacle_vgi WHERE obstacle_name = '$obs_id'";
	$result = pg_query($db, $query);
	$options = '';
	while ($row = pg_fetch_row($result)) {
		//$options .= '<option value="'.$row[15].'">'.$row[15].'</option>';
		$options .= '<h1>obstacle</h1><table border="1" cellspacing="0" style="width:500px;font-size:15px;table-layout:fixed;"><tbody>
		<tr><td width=\'120px\' id=\'obs_id\'><strong>obstacle id:</strong></td><td><address>'.$row[1].'</address></td></tr>
		<tr><td><strong>obstacle template:</strong></td><td><address>'.$row[2].'</address><button type="button" onclick="edit_rep(\''.$row[2].'\')">Edit</button></td></tr>
		<tr><td><strong>involved reports:</strong></td><td><address>'.$row[3].'</address></td></tr>
		<tr><td><strong>status: </strong></td><td><address>'.$row[7].'</address></td></tr>
		<tr><td><strong>numbers of reports: </strong></td><td><address>'.$row[8].'</address></td></tr>
		</tbody></table>';
	}
	echo $options;
		//'use_id'=>$row[0],'address'=>$row[1],'lat'=>$row[2], 'lng'=>$row[3], 'location_com'=>$row[4], 
		//'obs_type'=>$row[5], 'obs_com'=>$row[6], 'duration'=>$row[7], 'priority'=>$row[8],
		//'feedback'=>$row[9], 'submit_time'=>$row[10],'status'=>$row[11], 'report_id'=>$row[15], 'image_link'=>$row[14]
?>



		
