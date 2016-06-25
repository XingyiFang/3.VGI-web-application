<?php
    include 'db_con.php';
	// $db = pg_connect('host=localhost port=5432 dbname=google_markers user=postgres password=a7d6m5i4n362J');
	$query = "SELECT * from records_vgi";
	$result = pg_query($db, $query);
	$rowNumber = pg_num_rows($result);
	
	// Creates an array of strings to hold the lines of the KML file.
	$kml = array('<?xml version="1.0" encoding="UTF-8"?>');
	$kml[] = '<kml xmlns="http://earth.google.com/kml/2.1">';
	$kml[] = ' <Document>';
	$kml[] = ' <Style id="restaurantStyle">';
	$kml[] = ' <IconStyle id="restuarantIcon">';
	$kml[] = ' <Icon>';
	$kml[] = ' <href>http://maps.google.com/mapfiles/kml/pal2/icon63.png</href>';
	$kml[] = ' </Icon>';
	$kml[] = ' </IconStyle>';
	$kml[] = ' </Style>';
	$kml[] = ' <Style id="barStyle">';
	$kml[] = ' <IconStyle id="barIcon">';
	$kml[] = ' <Icon>';
	$kml[] = ' <href>http://maps.google.com/mapfiles/kml/pal2/icon27.png</href>';
	$kml[] = ' </Icon>';
	$kml[] = ' </IconStyle>';
	$kml[] = ' </Style>';

	// Iterates through the rows, printing a node for each row.
	while ($row = pg_fetch_row($result)) 
	{
	  $kml[] = ' <Placemark id="placemark' . $row[15] . '">';
	  $kml[] = ' <name>' . htmlentities($row[15]) . '</name>';
	  $kml[] = ' <description>' . htmlentities($row[1]) . '</description>';
	  $kml[] = ' <styleUrl>#barStyle</styleUrl>';
	  $kml[] = ' <Point>';
	  $kml[] = ' <coordinates>' . $row[3] . ','  . $row[2] . '</coordinates>';
	  $kml[] = ' </Point>';
	  $kml[] = ' </Placemark>';
	 
	} 

	// End XML file
	$kml[] = ' </Document>';
	$kml[] = '</kml>';
	$kmlOutput = join("\n", $kml);
	header('Content-type: application/vnd.google-earth.kml+xml');
	
	
	$f = fopen("obstacles.kml", "w");  
	fwrite($f, $kmlOutput);  
	fclose($f); 
?>