<?php
	$coods =$_REQUEST["coods"];
	//$newname = date('Y-m-d_H-i-s');
	$file = "polygon.txt";
	$lines = count(file($file));
	$newname = $lines+1;
	$tempname = 'polygon_'.$newname.';';
	
	$file_ = fopen($file,"a");
	$current = $tempname.$coods.PHP_EOL;
	fwrite($file_, $current);
	fclose($file_);
	echo $tempname;
?>