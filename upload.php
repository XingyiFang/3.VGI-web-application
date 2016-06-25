<?php
$output_dir = "C:/inetpub/wwwroot/images/";
$newname = date('Y-m-d_H-i-s');
//echo date('Y-m-d_H-i-s');

if(isset($_FILES["myfile1"]))
{
	
	//Filter the file types , if you want.
	if ($_FILES["myfile1"]["error"] > 0)
	{
	  echo "Error: " . $_FILES["myfile1"]["error"] . "<br>";
	}
	else
	{
		$pieces = explode(".", $_FILES["myfile1"]["name"]);
		switch ($_FILES["myfile1"]["type"]) {
			case 'image/jpeg':
			case 'image/gif':
			case 'image/png':
				move_uploaded_file($_FILES["myfile1"]["tmp_name"],$output_dir.$newname."(1).".$pieces[1]);
				echo "Uploaded image :".$newname."(1).".$pieces[1].";</br>";
			// Allowed
			break;
			default:
				echo "please upload images (jpe,gif,png)";// Not allowed
			break;
		}
		//move the uploaded file to uploads folder;

	}

}

if(isset($_FILES["myfile2"]))
{
	
	//Filter the file types , if you want.
	if ($_FILES["myfile2"]["error"] > 0)
	{
	  echo "Error: " . $_FILES["myfile2"]["error"] . "<br>";
	}
	else
	{	
		$pieces2 = explode(".", $_FILES["myfile2"]["name"]);
		switch ($_FILES["myfile2"]["type"]) {
			case 'image/jpeg':
			case 'image/gif':
			case 'image/png':
				move_uploaded_file($_FILES["myfile2"]["tmp_name"],$output_dir.$newname."(2).".$pieces2[1]);
				echo "Uploaded image :".$newname."(2).".$pieces2[1];
			// Allowed
			break;
			default:
				echo "please upload images (jpe,gif,png)";// Not allowed
			break;
		}
		//move the uploaded file to uploads folder;

	}

}
?>