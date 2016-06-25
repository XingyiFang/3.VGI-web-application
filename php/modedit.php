<?php
	//include 'modids.php';
	include 'db_con.php';
	$report_id=$_REQUEST['id'];
	$report_id1 = $report_id.'(mod)';
	// $db = pg_connect('host=localhost port=5432 dbname=google_markers user=postgres password=a7d6m5i4n362J');
	$query = "SELECT * from records_vgi WHERE report_id = '$report_id' or report_id='$report_id1'";
	$result = pg_query($db, $query);
	$options = '';
	$polytemplate ='';
	
	$file = fopen("polygon.txt","r");
	while(! feof($file))
	  {
		$value_ = trim(fgets($file));
		$pos = strpos($value_, 'polygon');
		if ($pos === false){	
		}else{
			$pieces = explode(";", $value_);
			$polytemplate .= '<option>'.$pieces[0].'</option>';
		};
	  };

	fclose($file);
	
	while ($row = pg_fetch_row($result)) {
		
		if(strpos($row[15],'(mod)') !== false){
			$types = explode(",", $row[30]);
			$mul_types = '';
			$default_types = array("sidewalk obstruction","construction detour","entrance/exit problem","poor surface condition","crowd/event","other");
			foreach ($types as $value){
				$mul_types .= '<option selected="selected">'.$value.'</option>';
				$key = array_search($value, $default_types);
				unset($default_types[$key]);
			};
			foreach ($default_types as $value1){
				$mul_types .= '<option>'.$value1.'</option>';
			};
			$images = explode(";", $row[33]);
			$options .= '<h1>moderator report</h1>
			<table border="1" cellspacing="0" style="width:500px;font-size:15px;table-layout:fixed;"><tbody>
			<tr><td width=\'120px\'><strong>user id:</strong></td><td id="uid"><address>'.$row[0].'</address></td></tr>
			<tr><td width=\'120px\'><strong>report id:</strong></td><td id="report_id"><address>'.$row[15].'</address></td></tr>
			<tr><td><strong>latitude:</strong></td><td><input id="lat" type="text" value='.$row[26].'></td></tr>
			<tr><td><strong>longitude:</strong></td><td><input id="lng" type="text" value='.$row[27].'></td></tr>
			<tr><td><strong>polygon template:</strong></td><td><select id="polytmp"><option selected="selected">'.$row[28].'</option><option disabled="disabled">---default value---</option>'.$polytemplate.'</select></td></tr>
			<tr><td><strong>positional accuracy (m):</strong></td><td><input id="pos_accu" type="text" value="'.$row[23].'"><button type="button" onclick="calculate_position()">calculate</button></td></tr>
			<tr><td><strong>location description:</strong></td><td><textarea id="loc_des" rows="4" cols="30">'.$row[29].'</textarea></td></tr>
			<tr><td><strong>obstacle type: </strong></td><td><select id="selType" name="D1" multiple>'.$mul_types.'
			</select></td></tr>
			<tr><td><strong>obstacle impact: </strong></td><td><select id="obs_impact"><option selected="selected">'.$row[31].'</option><option disabled="disabled">---default value---</option><option>visually-impaired</option><option>mobility-impaired</option><option>both</option><option>neither</option><option>do not know</option></select></td></tr>
			<tr><td><strong>obstacle description:</strong></td><td><textarea id="obs_des" rows="4" cols="30">'.$row[32].'</textarea></td></tr>
			<tr><td><strong>image1: </strong></td><td id="image1"><a target="_blank" href="../../images/'.$images[0].'">'.$images[0].'</a></td></tr>
			<tr><td><strong>image2: </strong></td><td id="image2"><a target="_blank" href="../../images/'.$images[1].'">'.$images[1].'</a></td></tr>
			<tr><td><strong>change images: </strong></td><td id="reupload"><button onclick="reUpload()">click to upload images</button><button onclick="remove_images()">remove images</button></td></tr>
			<tr><td><strong>image quality</strong></td><td><select id="image_quality"><option value="3">high</option><option value="2">medium</option><option value="1">low</option><option value="0">missing</option></select></td></tr>
			<tr><td><strong>duration: </strong></td><td><select id="selDur" name="D1"><option selected="selected">'.$row[34].'</option><option disabled="disabled">---default value---</option><option>Short (&lt; 1 day)</option><option>Medium (1-7 days)</option><option>Long (&gt; 7 days)</option></select></td></tr>
			<tr><td><strong>urgency: </strong></td><td><select id="selPriority" name="D1"><option selected="selected">'.$row[35].'</option><option disabled="disabled">---default value---</option><option>Low</option><option>Medium</option><option>High</option></select></td></tr>
			<tr><td><strong>feedback: </strong></td><td><textarea id="feedback" rows="2" cols="30">'.$row[9].'</textarea></td></tr>
			<tr><td><strong>status: </strong></td><td><input id="status" type="text" value='.$row[11].'></td></tr>
			<tr><td><strong>completeness score (moderator): </strong></td><td id="rep_score"><address>'.$row[21].'</address></td></tr>
			<tr><td><strong>boundary check: </strong></td><td id="bcheck"><address>'.$row[22].'</address></td></tr>
			<tr><td><strong>moderator flag: </strong></td><td id="flag"><address>'.$row[24].'</address></td></tr>
			<tr><td><strong>moderator comment: </strong></td><td><textarea id="mod_com" rows="3" cols="30">'.$row[36].'</textarea></td></tr>
			<tr><td><strong>moderator score: </strong></td><td><select id="mod_scale_val"><option>'.$row[37].'</option><option>--------</option><option>1</option><option>2</option><option>3</option><option>4</option><option>5</option></select></td></tr>
			<tr><td><strong>close date</strong></td><td><address>'.$row[45].' ; <p>extend date: <input type="text" id="datepicker"></p></address></td></tr>
			</tbody></table>';
		}else{
			$types = explode(",", $row[5]);
			$mul_types = '';
			$default_types = array("sidewalk obstruction","construction detour","entrance/exit problem","poor surface condition","crowd/event","other");
			foreach ($types as $value){
				$mul_types .= '<option selected="selected">'.$value.'</option>';
				$key = array_search($value, $default_types);
				unset($default_types[$key]);
			};
			foreach ($default_types as $value1){
				$mul_types .= '<option>'.$value1.'</option>';
			};
			$images = explode(";", $row[14]);
			$options .= '<h1>moderator report</h1>
			<table border="1" cellspacing="0" style="width:500px;font-size:15px;table-layout:fixed;"><tbody>
			<tr><td width=\'120px\'><strong>user id:</strong></td><td id="uid"><address>'.$row[0].'</address></td></tr>
			<tr><td width=\'120px\'><strong>report id:</strong></td><td id="report_id"><address>'.$row[15].'</address></td></tr>
			<tr><td><strong>latitude:</strong></td><td><input id="lat" type="text" value='.$row[2].'></td></tr>
			<tr><td><strong>longitude:</strong></td><td><input id="lng" type="text" value='.$row[3].'></td></tr>
			<tr><td><strong>polygon template:</strong></td><td><select id="polytmp"><option selected="selected">'.$row[28].'</option><option disabled="disabled">---default value---</option>'.$polytemplate.'</select></td></tr>
			<tr><td><strong>positional accuracy (m):</strong></td><td><input id="pos_accu" type="text" value="'.$row[23].'"><button type="button" onclick="calculate_position()">calculate</button></td></tr>
			<tr><td><strong>location description:</strong></td><td><textarea id="loc_des" rows="4" cols="30">'.$row[4].'</textarea></td></tr>
			<tr><td><strong>obstacle type: </strong></td><td><select id="selType" name="D1" multiple>'.$mul_types.'
			</select></td></tr>
			<tr><td><strong>obstacle impact: </strong></td><td><select id="obs_impact"><option selected="selected">'.$row[25].'</option><option disabled="disabled">---default value---</option><option>visually-impaired</option><option>mobility-impaired</option><option>both</option><option>neither</option><option>do not know</option></select></td></tr>
			<tr><td><strong>obstacle description:</strong></td><td><textarea id="obs_des" rows="4" cols="30">'.$row[6].'</textarea></td></tr>
			<tr><td><strong>image1: </strong></td><td id="image1"><a target="_blank" href="../../images/'.$images[0].'">'.$images[0].'</a></td></tr>
			<tr><td><strong>image2: </strong></td><td id="image2"><a target="_blank" href="../../images/'.$images[1].'">'.$images[1].'</a></td></tr>
			<tr><td><strong>change images: </strong></td><td id="reupload"><button onclick="reUpload()">click to upload images</button><button onclick="remove_images()">remove images</button></td></tr>
			<tr><td><strong>image quality</strong></td><td><select id="image_quality"><option value="3">high</option><option value="2">medium</option><option value="1">low</option><option value="0">missing</option></select></td></tr>
			<tr><td><strong>duration: </strong></td><td><select id="selDur" name="D1"><option selected="selected">'.$row[7].'</option><option disabled="disabled">---default value---</option><option>Short (&lt; 1 day)</option><option>Medium (1-7 days)</option><option>Long (&gt; 7 days)</option></select></td></tr>
			<tr><td><strong>urgency: </strong></td><td><select id="selPriority" name="D1"><option selected="selected">'.$row[8].'</option><option disabled="disabled">---default value---</option><option>Low</option><option>Medium</option><option>High</option></select></td></tr>
			<tr><td><strong>feedback: </strong></td><td><textarea id="feedback" rows="2" cols="30">'.$row[9].'</textarea></td></tr>
			<tr><td><strong>status: </strong></td><td><input id="status" type="text" value='.$row[11].'></td></tr>
			<tr><td><strong>completeness score (moderator): </strong></td><td id="rep_score"><address>'.$row[21].'</address></td></tr>
			<tr><td><strong>boundary check: </strong></td><td id="bcheck"><address>'.$row[22].'</address></td></tr>
			<tr><td><strong>moderator flag: </strong></td><td id="flag"><address>'.$row[24].'</address></td></tr>
			<tr><td><strong>moderator comment: </strong></td><td><textarea id="mod_com" rows="3" cols="30"></textarea></td></tr>
			<tr><td><strong>moderator score: </strong></td><td><select id="mod_scale_val"><option>1</option><option>2</option><option>3</option><option>4</option><option>5</option></select></td></tr>
			<tr><td><strong>close date</strong></td><td><address>'.$row[45].' ; <p>extend date: <input type="text" id="datepicker"></p></address></td></tr>
			</tbody></table>';		
		};
	};
	echo $options;
?>



		
