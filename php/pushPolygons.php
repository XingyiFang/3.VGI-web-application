<?php
	$json=array();
	$file = fopen("polygon.txt","r");
	while(! feof($file))
	  {
		$value_ = trim(fgets($file));
		$pos = strpos($value_, 'polygon');
		if ($pos === false){	
		}else{
			$pieces = explode(";", $value_);
			$num = count($pieces) - 2;
			//echo $num.'</br>';
			$categories = array('poly_id'=>$pieces[0], 'count' => $num);
			
			$output =  array_slice($pieces, 1);
			foreach($output as $key => $value){
				//echo $value.'</br>';
				$sub_pieces = explode(",", $value, 2);
				if(trim($sub_pieces[0]) == ''){
				}else{
				$categories['_'.trim($sub_pieces[0])] = $sub_pieces[1]; 	
				};
			};
			array_push($json,$categories);
		};
	  };

	fclose($file);
	echo json_encode($json);
?>