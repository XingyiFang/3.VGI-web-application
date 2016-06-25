<?php
    include 'db_con.php';
	$report_id=$_REQUEST['id'];
	$report_id1 = $report_id.'(mod)';
	// $db = pg_connect('host=localhost port=5432 dbname=google_markers user=postgres password=a7d6m5i4n362J');
	$query = "SELECT * from records_vgi WHERE report_id = '$report_id' or report_id='$report_id1'";
	$result = pg_query($db, $query);
	$options = '';
	while ($row = pg_fetch_row($result)) {
		//$options .= '<option value="'.$row[15].'">'.$row[15].'</option>';
		$options .= '<h1>report</h1><button type="button" onclick="Calculate_QA()">Calculate Quality Scores</button><table border="1" cellspacing="0" style="width:500px;font-size:15px;table-layout:fixed;"><tbody>
		<tr><td width=\'120px\'><strong>user id:</strong></td><td><address>'.$row[0].'</address></td></tr>
		<tr><td width=\'120px\'><strong>submission date:</strong></td><td id=\'sub_date\'><address>'.$row[10].'</address></td></tr>
		<tr><td width=\'120px\'><strong>observation date:</strong></td><td id=\'obs_date\'><address>'.$row[13].'</address></td></tr>
		<tr style="color: blue"><td><strong>QA: temporal consistency</strong></td><td id=\'QA_consis\'><address>'.$row[38].'</address></td></tr>
		<tr><td width=\'120px\'><strong>report id:</strong></td><td><address>'.$row[15].'</address></td></tr>
		<tr><td><strong>point.latitude:</strong></td><td id=\'org_lat\'><address>'.$row[2].'</address></td></tr>
		<tr><td><strong>point.longitude:</strong></td><td id=\'org_lng\'><address>'.$row[3].'</address></td></tr>
		<tr style="color: red"><td><strong>mod.latitude:</strong></td><td id=\'mod_lat\'><address>'.$row[26].'</address></td></tr>
		<tr style="color: red"><td><strong>mod.longitude:</strong></td><td id=\'mod_lng\'><address>'.$row[27].'</address></td></tr>
		<tr style="color: red"><td><strong>mod.polygon:</strong></td><td id=\'mod_poly\'><address>'.$row[28].'</address></td></tr>
		<tr style="color: blue"><td><strong>positional accuracy (m):</strong></td><td id=\'accuracy\'>'.$row[23].'</td></tr>
		<tr style="color: blue"><td><strong>QA: location (X,Y)</strong></td><td id=\'QA_loc_xy\'><address>'.$row[39].'</address></td></tr>
		<tr><td><strong>location description:</strong></td><td><address>'.$row[4].'</address></td></tr>
		<tr style="color: red"><td><strong>(mod) location description:</strong></td><td id="mod_loc_des"><address>'.$row[29].'</address></td></tr>
		<tr style="color: blue"><td><strong>QA: location (text)</strong></td><td id=\'QA_loc_text\'><address>'.$row[40].'</address></td></tr>
		<tr><td><strong>obstacle type: </strong></td><td id="obs_t"><address>'.$row[5].'</address></td></tr>
		<tr style="color: red"><td><strong>(mod) obstacle type: </strong></td><td id="mod_obs_t"><address>'.$row[30].'</address></td></tr>
		<tr style="color: blue"><td><strong>QA: obstacle type</strong></td><td id=\'QA_type\'><address>'.$row[41].'</address></td></tr>
		<tr><td><strong>obstacle impact: </strong></td><td id="imp"><address>'.$row[25].'</address></td></tr>
		<tr style="color: red"><td><strong>(mod) obstacle impact: </strong></td><td id="mod_imp"><address>'.$row[31].'</address></td></tr>
		<tr><td><strong>obstacle description: </strong></td><td><address>'.$row[6].'</address></td></tr>
		<tr style="color: red"><td><strong>(mod) obstacle description: </strong></td><td id="mod_obs_des"><address>'.$row[32].'</address></td></tr>
		<tr><td><strong>image: </strong></td><td>'.$row[14].'</td></tr>
		<tr style="color: red"><td><strong>(mod) image: </strong></td><td id="mod_img">'.$row[33].'</td></tr>
		<tr style="color: blue"><td><strong>QA: image</strong></td><td id=\'QA_image\'><address>'.$row[46].'</address></td></tr>
		<tr><td><strong>duration: </strong></td><td><address id="dur">'.$row[7].'</address></td></tr>
		<tr style="color: red"><td><strong>(mod) duration: </strong></td><td><address id="mod_dur">'.$row[34].'</address></td></tr>
		<tr style="color: blue"><td><strong>QA: duration</strong></td><td id=\'QA_duration\'><address>'.$row[42].'</address></td></tr>
		<tr><td><strong>urgency: </strong></td><td id="urg"><address>'.$row[8].'</address></td></tr>
		<tr style="color: red"><td><strong>(mod) urgency: </strong></td><td id="mod_urg"><address>'.$row[35].'</address></td></tr>
		<tr style="color: blue"><td><strong>QA: urgency</strong></td><td id=\'QA_urgency\'><address>'.$row[43].'</address></td></tr>
		<tr><td><strong>feedback: </strong></td><td><address>'.$row[9].'</address></td></tr>
		<tr><td><strong>status: </strong></td><td><address>'.$row[11].'</address></td></tr>
		
		<tr style="color: blue"><td><strong>QA: completeness</strong></td><td id=\'QA_comple\'><address>'.$row[21].'</address></td></tr>
		<tr><td><strong>boundary check: </strong></td><td><address>'.$row[22].'</address></td></tr>
		<tr><td><strong>moderator flag: </strong></td><td><address>'.$row[24].'</address></td></tr>	
		<tr style="color: red"><td><strong>moderator comment: </strong></td><td><address>'.$row[36].'</address></td></tr>
		
		<tr style="color: blue"><td><strong>QA: moderator quality score</strong></td><td id=\'QA_mod\'><address>'.$row[37].'</address></td></tr>
		<tr style="color: blue"><td><strong>QA: Total Score</strong></td><td id=\'QA_total\'><address>'.$row[47].'</address></td></tr>
		<tr style="color: blue"><td><strong>QA: Final Score</strong></td><td id=\'QA_final\'><address>'.$row[44].'</address></td></tr>
		<tr><td><strong>close date</strong></td><td><address>'.$row[45].'</address></td></tr>
		</tbody></table>';
	}
echo $options;
?>



		
