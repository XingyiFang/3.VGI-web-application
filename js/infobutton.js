var infowindowE =new google.maps.InfoWindow({
		content : '',
	});
function rep_confirm(id){
	var id_name = id.replace(" ","")
	$.ajax({
		type : "POST",
		url : "php/increment.php",
		data : {x : id_name},
		success : function(response) {
			$("#rep_confirm").attr("disabled", true);
				}
	});
}


function rep_add(id, marker_temp){
	google.maps.event.clearListeners(marker, 'click');
	var id_name = id.replace(" ","");
	//var number = marker_temp.replace( /^\D+/g, '');	
	$.getJSON("php/edit_report.php?id=" + id_name, function(data) {
		var new_location;
		for (var i in data) {
			new_location = new google.maps.LatLng(data[i].lat, data[i].lng);
		};
		marker.setPosition(new_location);
		infowindow.close();	
		infowindowE.close();			
		//get this report from database
		
		var contenttext = "<div id='tabs'><ul>"+
            "<li><a href='#tabs-1'>1.Welcome</a></li>"+
            "<li><a href='#tabs-2'>2.Obstacle Location</a></li>"+
            "<li><a href='#tabs-3'>3.Obstacle Type</a></li>"+
            "<li><a href='#tabs-4'>4.Upload Image</a></li>"+
            "<li><a href='#tabs-5'>5.Duration & Urgency</a></li>"+
            "<li><a href='#tabs-6'>6.Comments & Feedback</a></li></ul>"+
        	"<div id='tabs-1' class='same-frame'>"+
            "<address><strong>Enter a Contributor ID (6-8 characters):</strong></address>"+
            "<input id='use_id' type='textbox' value='' />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <br/><br/><br/>"+
            "<address><strong>When did you observe the obstacle?</strong></address>"+
            "<input type='text' name='datetimepicker' id='datetimepicker'>"+data[0].submit_time+"</input>"+       
            "<a class='nexttab' href='#'>Next -></a></div>"+
			"<div id='tabs-2' class='same-frame'><table style='width: 95%;'><tr><td colspan='2'>"+
			"<address style='font-size:85%;'><strong>Name of closest address or building</strong></address>"+
                        "<input id='input_address' type='textbox' value='research hall, george mason university, Fairfax, VA 22030' /></br>"+
                        "<input type='button' value='Submit' onclick='codeAddress()' style='font-size:85%;'/></td>"+
                    "<td><address style='font-size:85%;'><strong>Describe the location   (80 characters limit):</strong></address></td></tr>"+
                "<tr><td id='address' colspan='2'>'Move to obtain the address/lat&lng'</td><td rowspan='4'>"+
                        "<textarea id='location_com' rows='4' cols='18'>"+data[0].location_com+"</textarea></td></tr>"+
                "<tr style='font-size:65%;'><td class='auto-style1'><address><strong>Latitude/Longitude:</strong></address></td>"+
                    "<td id='lat' style='background-color:lightgrey'></td></tr>"+
                "<tr><td><a class='nexttab1' href='#'><- Back</a><a class='nexttab2'>||</a><a class='nexttab' href='#'>Next -></a></td></tr></table></div>"+
        "<div id='tabs-3' class='same-frame'><table style='width: 95%;'>"+
                "<tr><td><address><strong>Obstacle Type:</strong></address></td>"+
                    "<td><address><strong>Describe the obstacle (80 characters limit):</strong></address></td></tr>"+
                "<tr><td><select id='selType' name='D1'>"+
							"<option>"+data[0].obstacle_type+"</option>"+
                            "<option>---------------</option>"+
                            "<option>sidewalk obstruction</option>"+
                            "<option>construction detour</option>"+
                            "<option>entrance/exit problem</option>"+
                            "<option>poor surface condition</option>"+
                            "<option>crowd/event</option>"+
                            "<option>other</option>"+
                        "</select></td><td rowspan='2'>"+
                        "<textarea id='obs_com' cols='20' rows='4'>"+data[0].obs_com+"</textarea></td></tr>"+
                "<tr><td><a class='nexttab1' href='#'><- Back</a><a class='nexttab2'>||</a><a class='nexttab' href='#'>Next -></a></td></tr></table></div>"+
        "<div id='tabs-4' class='same-frame'><table style='width: 100%;'><tr><td><form id='myForm' action='upload.php' method='post' enctype='multipart/form-data'>"+
			"<input type='file' size='60' name='myfile'>"+
			"<input type='submit' value='Upload'></form>"+
			"<div id='progress'><div id='bar'></div><div id='percent'>0%</div ></div>"+
			"<br/><div id='message'></div></td></tr>"+
                "<tr><td></td></tr>"+
            "<tr><td><a class='nexttab1' href='#'><- Back</a><a class='nexttab2'>||</a><a class='nexttab' href='#'>Next -></a></td></tr></table></div>"+
        "<div id='tabs-5' class='same-frame'><table style='width:100%;'>"+
        "<tr><td><table style='width: 100%;'><tr><td><address><strong>Duration(estimate):</strong></address></td></tr>"+
                "<tr><td><select id='selDur' name='D1'>"+
						"<option>"+data[0].duration+"</option>"+
                        "<option>---------------</option>"+
                        "<option>Short (< 1 day)</option>"+
                        "<option>Medium (1-7 days)</option>"+
                        "<option>Long (> 7 days)</option>"+
                        "</select></td></tr>"+
            "<tr><td><a class='nexttab' href='#'></a></td></tr></table></td>"+
			"<td><table style='width: 100%;'>"+
            "<tr><td><address><strong>Urgency Estimate:</strong></address></td></tr>"+
                "<tr><td><select id='selPriority' name='D1'>"+
						"<option>"+data[0].priority+"</option>"+
                        "<option>----</option>"+
                        "<option>Low</option><option>Medium</option><option>High</option></select></td></tr>"+
                "<tr><td><a class='nexttab1' href='#'><- Back</a><a class='nexttab2'>||</a><a class='nexttab' href='#'>Next -></a></td></tr></table>"+
			"</td></tr></table></div>"+
			
			"<div id='tabs-6' class='same-frame'><table style='width:100%;'>"+
        "<tr><td><table style='width: 100%;'><tr><td><address><strong>Obstacle Comments</strong></address></td></tr>"+
                "<tr><td><textarea id='Obscomments' cols='20' rows='4'>"+data[0].obs_com+"</textarea></td></tr>"+
                "</table></td>"+
			"<td><table style='width: 100%;'>"+
            "<tr><td><address><strong>General Feedback</strong></address></td></tr>"+
                "<tr><td><textarea id='feedback' cols='20' rows='4'>"+data[0].feedback+"</textarea></td></tr>"+
                "</table>"+
			"</td></tr><tr><td><a class='nexttab1' href='#'><- Back</a><a class='nexttab2'>||</a><a class='next_submit' href='#'>Submit</a></td></tr></table></div></div>";
	
	infowindowE.setContent(contenttext);
	
	google.maps.event.addListener(infowindowE, 'domready', function() {
	var options = { 
    beforeSend: function() 
    {
    	$("#progress").show();
    	//clear everything
    	$("#bar").width('0%');
    	$("#message").html("");
		$("#percent").html("0%");
    },
    uploadProgress: function(event, position, total, percentComplete) 
    {
    	$("#bar").width(percentComplete+'%');
    	$("#percent").html(percentComplete+'%');
    },
    success: function() 
    {
        $("#bar").width('100%');
    	$("#percent").html('100%');
    },
	complete: function(response) 
	{
		$("#message").html("<font color='green'>"+response.responseText+"</font>");
	},
	error: function()
	{
		$("#message").html("<font color='red'> ERROR: unable to upload files</font>");

	}
     
	}; 
     $("#myForm").ajaxForm(options);
		$("#tabs").tabs();
		
		$('#datetimepicker').datetimepicker({
			timeFormat: "hh:mm tt"
		});
		$(".nexttab").click(function() {
			var selected = $("#tabs").tabs("option", "active");
			$("#tabs").tabs("option", "active", selected + 1);
		});
		$(".nexttab1").click(function() {
			var selected = $("#tabs").tabs("option", "active");
			$("#tabs").tabs("option", "active", selected - 1);
		});
		$(".next_submit").click(function() {		
			var use_id = $('#use_id').val();
			var address = $("#address").text();
			var vallat = lat;
			var vallng = lng;
			var location_com = $('#location_com').val();
			var obs_type = $('#selType option:selected').text();
			var obs_com = $('#obs_com').val();
			var duration = $('#selDur option:selected').text();
			var priority = $('#selPriority option:selected').text();
			var Obscomments = $('#Obscomments').val();
			var feedback = $('#feedback').val();
			var currentTime = new Date();
			var month = currentTime.getMonth() + 1;
			var day = currentTime.getDate();
			var year = currentTime.getFullYear();
			var hours = currentTime.getHours();
			var minutes = currentTime.getMinutes();	
			$.ajax({
				type : "POST",
				url : "php/number.php",
				success : function(response) {
					//alert(response);
				var image_name = $("#message").text().replace('Uploaded File :','');
				//alert(image_name);
				var report_ini = parseInt(response) + 1;
				var report_id = 'report_000'+ report_ini.toString();
				if (minutes < 10) {
					minutes = "0" + minutes
				};
				if (hours > 11) {
					var finalTime = month + "/" + day + "/" + year + " " + hours + ":" + minutes + " PM"; 
					var reportTime = $('#datetimepicker').val();
				} else {
					var finalTime = month + "/" + day + "/" + year + " " + hours + ":" + minutes + " AM";
					var reportTime = $('#datetimepicker').val();
				}						
			var strtable = "<table style='width:100%;font-size:15px;table-layout:fixed;'>"+
			"<tr><td><strong>Report ID: </strong></td><td><address>"+report_id+"</address></td></tr>"+
			"<tr><td class='sum_table1'><strong>User ID: </strong></td><td class='sum_table2'><address>"+use_id+"</address></td></tr>"+
			"<tr><td><strong>Report date: </strong></td><td class='sum_table2'><address>"+finalTime+"</address></td></tr>"+
			"<tr><td><strong>Obstacle type: </strong></td><td class='sum_table2'><address>"+obs_type+"</address></td></tr>"+
			"<tr><td><strong>Obstacle location: </strong></td><td class='sum_table2'><address>"+address+"</address></td></tr>"+
			"<tr><td><strong>Image Name: </strong></td><td class='sum_table2'><address>"+image_name+"</address></td></tr>"+
			"<tr><td><strong>Describe the obstacle type: </strong></td><td class='sum_table2'><address>"+obs_com+"</address></td></tr>"+
			"<tr><td><strong>Duration: </strong></td><td class='sum_table2'><address>"+duration+"</address></td></tr>"+
			"<tr><td><strong>Priority: </strong></td><td class='sum_table2'><address>"+priority+"</address></td></tr>"+
			"<tr><td><strong>Obstacle Comments: </strong></td><td class='sum_table2'><address>"+Obscomments+"</address></td></tr>"+
			"<tr><td><strong>General Feedback: </strong></td><td class='sum_table2'><address>"+feedback+"</address></td></tr></table>";
    		Boxy.ask(strtable, ["Confirm", "Edit"], function(val) {
      			   if(val=="Confirm"){
				    report_ini++;
					submit1();
      			   }  
    			}, {title: "Summary"});
    		return false;					
			}});
			
		});
	});
	
		google.maps.event.addListener(marker, 'click', function() {
			infowindowE.open(map, marker);
			updateMarkerPosition(marker.getPosition());
			geocodePosition(marker.getPosition());
			geocodePosition(marker.getPosition());
			google.maps.event.addListener(marker, 'drag', function() {
				updateMarkerPosition(marker.getPosition());
			});

			google.maps.event.addListener(marker, 'dragend', function() {
				geocodePosition(marker.getPosition());
			});
		});
		
		google.maps.event.trigger(marker, 'click');	
	});	
	//infowindowN.open(map, marker);
}


function rep_remove(id, marker, data_status, index_){
	var id_name = id.replace(" ","")
	$.ajax({
		type : "POST",
		url : "php/report_status_5.php",
		data : {x : id_name},
		success : function(response) {
			//var number = marker.replace( /^\D+/g, '');
			//var index = markers_all.indexOf(markers_index[marker]);
			//var test = new Object();
			//test = markers_index[marker];
			//markers_all[index].setMap(null);
			switch (data_status)
			{
			case 1:
				markers_1[index_].setMap(null);
			case 2:
				//alert(index_);
				markers_2[index_].setMap(null);
			case 3:
				//alert(index_);
				markers_3[index_].setMap(null);
			case 4:
				//alert(index_);
				markers_4[index_].setMap(null);
			}
			infowindow.close();
				}
	});
}

function obs_remove(id, obstacle, reports, data_status, index_){
	var id_name = id.replace(" ","")
	var array = reports.split(",")
	var arr_num = array.length - 1
	if (array[arr_num] = " ") {
		//alert(array[arr_num])
		array.splice(arr_num, 1)
		//alert(array)
	}
	$.ajax({
		type : "POST",
		url : "php/obs_status_2.php",
		data : {
			x : id_name,
			y : array,
		},
		success : function(response) {
			//alert(response);
			switch (data_status)
			{
			case 1:
				markers_obstacle[index_].setMap(null);
			case 2:
				//alert(index_);
				//markers_2[index_].setMap(null);
			case 3:
				//alert(index_);
				//markers_3[index_].setMap(null);
			case 4:
				//alert(index_);
				//markers_4[index_].setMap(null);
			}
			infowindow.close();
				}
	});
}


