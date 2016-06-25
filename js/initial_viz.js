var marker;
var map;
var infoWindows =[];
var geocoder = new google.maps.Geocoder();
var j = 0;
var image = 'images/icon.png';
var lat;
var lng;
var initialLocation;
var markers_all = [];
var markers_index = [];
var markers_1 = [];
var markers_2 = [];
var markers_3 = [];
var markers_5 = [];
var markers_6 = [];
var markers_obstacle = [];
var markers_all_dir = {};
var markers_day_dir = {};
var position;
var widthtotal, widthli;
var find_location;
var g_animation = false;
var infowindowL = new google.maps.InfoWindow();
var infoWindowPoly = new google.maps.InfoWindow();
var checkL = false;
var checkdraw = false;


var markers_poly = [];
var shape;
var path = new google.maps.MVCArray;

function HomeControl(controlDiv, map) {

  // Set CSS styles for the DIV containing the control
  // Setting padding to 5 px will offset the control
  // from the edge of the map
  controlDiv.style.paddingBottom = '10px';
  controlDiv.style.paddingLeft = '10px';
  controlDiv.style.fontFamily = 'Arial,sans-serif';
  controlDiv.style.fontSize = '16px';
  
  // titleLegend: Set CSS for the control border
  var titleLegend = document.createElement('div');
  titleLegend.style.backgroundColor = 'white';
  titleLegend.style.borderStyle = 'solid';
  titleLegend.style.borderWidth = '0px';
  titleLegend.style.cursor = 'pointer';
  titleLegend.style.textAlign = 'center';
  titleLegend.title = 'Legend';
  controlDiv.appendChild(titleLegend);

  // Set CSS for the control interior
  var titleText = document.createElement('div');
  titleText.style.paddingLeft = '8px';
  titleText.style.paddingRight = '8px';
  titleText.style.paddingTop = '5px';
  titleText.innerHTML = '<b>Legend</b>';
  titleLegend.appendChild(titleText);
  
  // Obstacles Set CSS for the control border
  var obstaclesLegend = document.createElement('div');
  obstaclesLegend.style.backgroundColor = 'white';
  obstaclesLegend.style.borderStyle = 'solid';
  obstaclesLegend.style.borderWidth = '0px';
  obstaclesLegend.style.cursor = 'pointer';
  obstaclesLegend.style.textAlign = 'Left';
  obstaclesLegend.style.paddingLeft = '8px';
  obstaclesLegend.style.paddingRight = '8px';
  obstaclesLegend.title = 'Legend';
  controlDiv.appendChild(obstaclesLegend);

  // Set CSS for the control interior
  var obstaclesck = document.createElement('input');//obstacle checkbox
  obstaclesck.type = 'checkbox';
  obstaclesck.checked = 'true';
  obstaclesLegend.appendChild(obstaclesck);
  
  var obstaclesimg = document.createElement('span');
  obstaclesimg.style.verticalAlign = 'middle';
  obstaclesimg.style.display = 'inline-block';
  obstaclesimg.style.background = 'url(images/accesdenied.png) no-repeat';
  obstaclesimg.style.height ='41px';
  obstaclesimg.style.width = '36px';
  obstaclesLegend.appendChild(obstaclesimg);
  
  var obstaclestext =  document.createElement('span');
  obstaclestext.innerHTML = 'Obstacles';
  obstaclesLegend.appendChild(obstaclestext);
  
  var obstaclesbr = document.createElement('br');
  obstaclesLegend.appendChild(obstaclesbr);
  
  
  // Reports Set CSS for the control border
  var reportsLegend = document.createElement('div');
  reportsLegend.style.backgroundColor = 'white';
  reportsLegend.style.borderStyle = 'solid';
  reportsLegend.style.borderWidth = '0px';
  reportsLegend.style.cursor = 'pointer';
  reportsLegend.style.textAlign = 'Left';
  reportsLegend.style.paddingLeft = '8px';
  reportsLegend.style.paddingRight = '8px';
  reportsLegend.title = 'Legend';
  controlDiv.appendChild(reportsLegend);

  // Set CSS for the control interior
  var reportsck = document.createElement('input');//report1 checkbox
  reportsck.type = 'checkbox';
  reportsck.checked = "true";
  reportsLegend.appendChild(reportsck);
  
  var reportsimg = document.createElement('span');
  reportsimg.style.verticalAlign = 'middle';
  reportsimg.style.display = 'inline-block';
  reportsimg.style.background = 'url(images/caution_underreview.png) no-repeat';
  reportsimg.style.height ='41px';
  reportsimg.style.width = '36px';
  reportsLegend.appendChild(reportsimg);
  
  var reportstext =  document.createElement('span');
  reportstext.innerHTML = 'under review';
  reportsLegend.appendChild(reportstext);
  
  var reportsbr = document.createElement('br');
  reportsLegend.appendChild(reportsbr);
  
  // Reports-2 Set CSS for the control border
  var reportsLegend2 = document.createElement('div');
  reportsLegend2.style.backgroundColor = 'white';
  reportsLegend2.style.borderStyle = 'solid';
  reportsLegend2.style.borderWidth = '0px';
  reportsLegend2.style.cursor = 'pointer';
  reportsLegend2.style.textAlign = 'Left';
  reportsLegend2.style.paddingLeft = '8px';
  reportsLegend2.style.paddingRight = '8px';
  reportsLegend2.title = 'Legend';
  controlDiv.appendChild(reportsLegend2);

  // Set CSS for the control interior
  var reportsck2 = document.createElement('input');//report2 checkbox
  reportsck2.type = 'checkbox';
  reportsck2.checked = "true";
  reportsLegend2.appendChild(reportsck2);
  
  var reportsimg2 = document.createElement('span');
  reportsimg2.style.verticalAlign = 'middle';
  reportsimg2.style.display = 'inline-block';
  reportsimg2.style.background = 'url(images/caution_process.png) no-repeat';
  reportsimg2.style.height ='41px';
  reportsimg2.style.width = '36px';
  reportsLegend2.appendChild(reportsimg2);
  
  var reportstext2 =  document.createElement('span');
  reportstext2.innerHTML = 'confirm';
  reportsLegend2.appendChild(reportstext2);
  
  var reportsbr2 = document.createElement('br');
  reportsLegend2.appendChild(reportsbr2);
  
  // Reports-6 Set CSS for the control border
  var reportsLegend6 = document.createElement('div');
  reportsLegend6.style.backgroundColor = 'white';
  reportsLegend6.style.borderStyle = 'solid';
  reportsLegend6.style.borderWidth = '0px';
  reportsLegend6.style.cursor = 'pointer';
  reportsLegend6.style.textAlign = 'Left';
  reportsLegend6.style.paddingLeft = '8px';
  reportsLegend6.style.paddingRight = '8px';
  reportsLegend6.title = 'Legend';
  controlDiv.appendChild(reportsLegend6);

  // Set CSS for the control interior
  var reportsck6 = document.createElement('input');//report6 checkbox
  reportsck6.type = 'checkbox';
  reportsck6.checked = "true";
  reportsLegend6.appendChild(reportsck6);
  
  var reportsimg6 = document.createElement('span');
  reportsimg6.style.verticalAlign = 'middle';
  reportsimg6.style.display = 'inline-block';
  reportsimg6.style.background = 'url(images/official.png) no-repeat';
  reportsimg6.style.height ='41px';
  reportsimg6.style.width = '36px';
  reportsLegend6.appendChild(reportsimg6);
  
  var reportstext6 =  document.createElement('span');
  reportstext6.innerHTML = 'official reports';
  reportsLegend6.appendChild(reportstext6);
  
  var reportsbr6 = document.createElement('br');
  reportsLegend6.appendChild(reportsbr6);
  
  // Reports-5 Set CSS for the control border
  var reportsLegend5 = document.createElement('div');
  reportsLegend5.style.backgroundColor = 'white';
  reportsLegend5.style.borderStyle = 'solid';
  reportsLegend5.style.borderWidth = '0px';
  reportsLegend5.style.cursor = 'pointer';
  reportsLegend5.style.textAlign = 'Left';
  reportsLegend5.style.paddingLeft = '8px';
  reportsLegend5.style.paddingRight = '8px';
  reportsLegend5.title = 'Legend';
  controlDiv.appendChild(reportsLegend5);

  // Set CSS for the control interior
  var reportsck5 = document.createElement('input');//report5 checkbox
  reportsck5.type = 'checkbox';
  reportsck5.checked = "true";
  reportsLegend5.appendChild(reportsck5);
  
  var reportsimg5 = document.createElement('span');
  reportsimg5.style.verticalAlign = 'middle';
  reportsimg5.style.display = 'inline-block';
  reportsimg5.style.background = 'url(images/caution_test.png) no-repeat';
  reportsimg5.style.height ='41px';
  reportsimg5.style.width = '36px';
  reportsLegend5.appendChild(reportsimg5);
  
  var reportstext5 =  document.createElement('span');
  reportstext5.innerHTML = 'closed';
  reportsLegend5.appendChild(reportstext5);
  
  var reportsbr5 = document.createElement('br');
  reportsLegend5.appendChild(reportsbr5);

  google.maps.event.addDomListener(obstaclesck, 'click', function() {
	if(this.checked){
	  setMap_obs(map);
	}else{
	  setMap_obs(null);
	}
  });

  google.maps.event.addDomListener(reportsck, 'click', function() {
	if(this.checked){
	  setMap_1(map);
	}else{
	  setMap_1(null);
	}
  });
  
  google.maps.event.addDomListener(reportsck2, 'click', function() {
	if(this.checked){
	  setMap_2(map);
	  setMap_3(map);
	}else{
	  setMap_2(null);
	  setMap_3(null);
	}
  });
  
  google.maps.event.addDomListener(reportsck6, 'click', function() {
	if(this.checked){
	  setMap_6(map);
	}else{
	  setMap_6(null);
	}
  });
  
  google.maps.event.addDomListener(reportsck5, 'click', function() {
	if(this.checked){
	  setMap_5(map);
	}else{
	  setMap_5(null);
	}
  });

};

function updateMarkerPosition(latLng) {
	if (document.getElementById("lat1")) {
		document.getElementById('lat1').innerHTML = latLng.lat().toFixed(5) + ',' + latLng.lng().toFixed(5);
		lat = latLng.lat();
		lng = latLng.lng();
		//alert(lat);
	}

}

function updateMarkerAddress(str) {
	if (document.getElementById("address1")) {
		document.getElementById('address1').innerHTML = str;
	}

}

function geocodePosition(pos) {
	geocoder.geocode({
		latLng : pos
	}, function(responses) {
		if (responses && responses.length > 0) {
			updateMarkerAddress(responses[0].formatted_address);
			find_location = responses[0].geometry.location;
		} else {
			updateMarkerAddress('Cannot determine address at this location.');
		}
	});
}

var rendererOptions = {
	draggable : true
};
var directionsDisplay = new google.maps.DirectionsRenderer(rendererOptions);
;
var directionsService = new google.maps.DirectionsService();


function hideAllReports() {
	$.ajax({
		type : "POST",
		url : "php/turn_reports.php",
		data : {
			type : 'hide'
		},
		success : function(response) {
			location.reload();
		}
	});
}

function showAllReports() {
	$.ajax({
		type : "POST",
		url : "php/turn_reports.php",
		data : {
			type : 'show'
		},
		success : function(response) {
			location.reload();
		}
	});
}

function timeset() {
	var currentTime_new = new Date();
	var month_new = currentTime_new.getMonth() + 1
	var day_new = currentTime_new.getDate()
	var year_new = currentTime_new.getFullYear()
	var hours_new = currentTime_new.getHours();
	var minutes_new = currentTime_new.getMinutes();
	if (minutes_new < 10) {
		minutes_new = "0" + minutes_new
	};
	if (hours_new > 11) {
		var ap_new = "pm";
		hours_new =  hours_new - 12;
		hours_new = "0" + hours_new;
	} else {
		var ap_new = "am";
	};
	var datetime_new = month_new + "/" + day_new + "/" + year_new + " " + hours_new + ":" + minutes_new + " " + ap_new;
	//alert(datetime);
	$("#datetimepicker").val(datetime_new);
};

function initialize() {
	timeset();
	
	var icons = {
		header : "ui-icon-circle-arrow-e",
		activeHeader : "ui-icon-circle-arrow-s"
	};
	$("#accordion").accordion({
		collapsible : true,
		heightStyle : "content",
		icons : icons
	});

	//initial
	var myLatlng = new google.maps.LatLng(38.830291, -77.312767);
	var mapOptions = {
		zoom : 15,
		center : myLatlng,
		minZoom : 14,
		mapTypeId : google.maps.MapTypeId.ROADMAP
	};
	map = new google.maps.Map(document.getElementById('map_canvas'), mapOptions);
	
	var homeControlDiv = document.createElement('div');
	var homeControl = new HomeControl(homeControlDiv, map);

	homeControlDiv.index = 1;
	map.controls[google.maps.ControlPosition.LEFT_BOTTOM].push(homeControlDiv);
	
	//new google.maps.LatLngBounds(new google.maps.LatLng(38.81062025741668, -77.3422908782959), new google.maps.LatLng(38.84358502979058, -77.27813243865967));
	// Bounds for North America
	var strictBounds = new google.maps.LatLngBounds(new google.maps.LatLng(38.81062025741668, -77.3422908782959), new google.maps.LatLng(38.84358502979058, -77.27813243865967));

	// Listen for the dragend event
	google.maps.event.addListener(map, 'dragend', function() {
		if (strictBounds.contains(map.getCenter()))
			return;

		// We're out of bounds - Move the map back within the bounds

		var c = map.getCenter(), x = c.lng(), y = c.lat(), maxX = strictBounds.getNorthEast().lng(), maxY = strictBounds.getNorthEast().lat(), minX = strictBounds.getSouthWest().lng(), minY = strictBounds.getSouthWest().lat();

		if (x < minX)
			x = minX;
		if (x > maxX)
			x = maxX;
		if (y < minY)
			y = minY;
		if (y > maxY)
			y = maxY;

		map.setCenter(new google.maps.LatLng(y, x));
	});

	var time1 = new Date().getTime();
	$.getJSON('php/pushmarkers.php?_=' + time1, function(data) {
		//alert(data.length);
		for (var i = 0; i < data.length; i++) {
			//alert(i);
			var point = new google.maps.LatLng(data[i].lat, data[i].lng);
			if (data[i].image_link == null) {
				var image_url = '';
				var image_url1 = '', image_url2 = '';
				var images_1 = '', images_2 = '';
				//data[i].image_link = '';
			} else {
				//alert(data[i].image_link);
				var images = data[i].image_link.split(";");
				var image_url1 = "target='_blank' href='../../images/" + images[0] + "'";
				var images_1 = images[0];
				//alert(images[1]);
				if ( typeof images[1] === "undefined") {
					var image_url2 = '';
					var images_2 = '';
				} else {
					//console.log(images[1]);
					var image_url2 = "target='_blank' href='../../images/" + images[1] + "'";
					var images_2 = images[1];
				};
			};

			var content = "<table style='width:100%;font-size:15px;table-layout:fixed;'>" + 
				"<tr><td><strong>Report ID: </strong></td><td><address id='rep_id'>" + data[i].report_id + "</address></td></tr>" + "<tr><td><strong>Report date: </strong></td><td class='sum_table2'><address>" + 
				data[i].submit_time + "</address></td></tr>" + "<tr><td><strong>Obstacle type: </strong></td><td class='sum_table2'><address>" + data[i].obs_type + 
				"</address></td></tr>" + "<tr><td><strong>Obstacle impact: </strong></td><td class='sum_table2'><address>" + data[i].obs_impact + "</address></td></tr>" + 
				"<tr><td><strong>Image: </strong></td><td class='sum_table2'><a " + image_url1 + ">" + images_1 + "</a>	<a " + image_url2 + ">" + images_2 + "</a></td></tr>" + 
				"<tr><td><strong>Duration: </strong></td><td class='sum_table2'><address>" + data[i].duration + "</address></td></tr>" + "<tr><td><strong>Urgency: </strong></td><td class='sum_table2'><address>" + 
				data[i].priority + "</address></td></tr>" + "<tr><td><strong>Location Comment: </strong></td><td class='sum_table2'><address>" + data[i].location_com + "</address></td></tr>" + 
				"<tr><td><strong>Obstacle Comment: </strong></td><td class='sum_table2'><address>" + data[i].obs_com + "</address></td></tr>" + 
				"<tr><td><strong>Status: </strong></td><td class='sum_table2'><address>submitted/in process/under review</address></td></tr>" + 
				"<tr><td colspan='2'><input id='rep_confirm' type='button' value='Confirm this report' onclick='rep_confirm(&#39;" + data[i].report_id + "&#39;)'/></td></tr></table>";			
			var data_status = data[i].status;
			var key = data[i].qa_final + "_" + i;
			var key_day = "Null";
			if(data[i].obs_time){
				key_day = data[i].obs_time.split(" ")[1];
				if(key_day){
					key_day = key_day.split(":", 1);
					key_day = key_day + "_" + i;
				}	
			};
			//alert(data_status);
			//data_status = data_status.replace(" ", "");
			if (data_status == "1") {
				var marker = new google.maps.Marker({map : map, 
					position : point, 
					icon: 'images/caution_underreview.png'});
				//map.addMarker(createMarker(content,point));
				//var infowindow;
				var infowindow = new google.maps.InfoWindow();
				infoWindows.push(infowindow); 
				markers_1.push(marker);
				markers_all.push(marker);
				markers_all_dir[key] = marker;
				markers_day_dir[key_day] = marker;
				
				google.maps.event.addListener(marker,'click', (function(marker,content,infowindow){ 
						return function() {
							for (var i=0;i<infoWindows.length;i++) {
							infoWindows[i].close();
							};
						   infowindow.setContent(content);
						   infowindow.open(map,marker);
						};
					})(marker,content,infowindow)); 
				
			}else if (data_status == "2"){
				var marker = new google.maps.Marker({
					map : map, 
					position : point, 
					icon: 'images/caution_process.png'}				
				);
				var infowindow = new google.maps.InfoWindow();
				infoWindows.push(infowindow); 
				markers_2.push(marker);
				markers_all.push(marker);
				markers_all_dir[key] = marker;
				markers_day_dir[key_day] = marker;
				
				google.maps.event.addListener(marker,'click', (function(marker,content,infowindow){ 
						return function() {
							for (var i=0;i<infoWindows.length;i++) {
							infoWindows[i].close();
							};
						   infowindow.setContent(content);
						   infowindow.open(map,marker);
						};
					})(marker,content,infowindow)); 
					
				
			}else if (data_status == "3"){
				var marker = new google.maps.Marker({map : map, 
					position : point, 
					icon: 'images/caution_process.png'});
				//map.addMarker(createMarker(content,point));
				//var infowindow;
				var infowindow = new google.maps.InfoWindow();
				infoWindows.push(infowindow); 
				markers_3.push(marker);
				markers_all.push(marker);
				markers_all_dir[key] = marker;
				markers_day_dir[key_day] = marker;
				
				google.maps.event.addListener(marker,'click', (function(marker,content,infowindow){ 
						return function() {
							for (var i=0;i<infoWindows.length;i++) {
							infoWindows[i].close();
							};
						   infowindow.setContent(content);
						   infowindow.open(map,marker);
						};
					})(marker,content,infowindow)); 
			}else if (data_status == "5"){
				var marker = new google.maps.Marker({map : map, 
					position : point, 
					icon: 'images/caution_test.png'});
				
				var infowindow = new google.maps.InfoWindow();
				infoWindows.push(infowindow); 
				markers_5.push(marker);
				markers_all.push(marker);
				markers_all_dir[key] = marker;
				markers_day_dir[key_day] = marker;
				
				google.maps.event.addListener(marker,'click', (function(marker,content,infowindow){ 
						return function() {
							for (var i=0;i<infoWindows.length;i++) {
							infoWindows[i].close();
							};
						   infowindow.setContent(content);
						   infowindow.open(map,marker);
						};
					})(marker,content,infowindow)); 
			}else if (data_status == "6"){
				var marker = new google.maps.Marker({map : map, 
					position : point, 
					icon: 'images/official.png'});
				
				var infowindow = new google.maps.InfoWindow();
				infoWindows.push(infowindow); 
				markers_6.push(marker);
				markers_all.push(marker);
				markers_all_dir[key] = marker;
				markers_day_dir[key_day] = marker;
				
				google.maps.event.addListener(marker,'click', (function(marker,content,infowindow){ 
						return function() {
							for (var i=0;i<infoWindows.length;i++) {
							infoWindows[i].close();
							};
						   infowindow.setContent(content);
						   infowindow.open(map,marker);
						};
					})(marker,content,infowindow)); 
			};
		};
	});
	
		
	$.getJSON('php/pushPolygons.php?_=' + time1, function(data) {
		for (var m in data) {
			var coords =[];
			//alert(data[m]);
			$.each(data[m], function(key, val){
				
				if(key=="count" || key =="poly_id")
				{
					//alert(val);
				}else{
					coords.push(new google.maps.LatLng(val.split(",")[0], val.split(",")[1])); 
				}
			
			});
			var content = data[m].poly_id;
			var polygon = new google.maps.Polygon({
				paths: coords,
				strokeColor: '#FF0000',
				strokeOpacity: 0.8,
				strokeWeight: 3,
				fillColor: '#FF0000',
				fillOpacity: 0.35
			  });
			polygon.setMap(map);
			//google.maps.event.addListener(polygon, 'click', showid);
			//infoWindowPoly.setContent(content); 
			var infowindow = new google.maps.InfoWindow();
				infoWindows.push(infowindow); 

				google.maps.event.addListener(polygon,'click', (function(polygon,content,infowindow){ 
						return function() {
							//var len = polygon.getPath().getLength();
							//for (var i = 0; i < len; i++) {
								//alert();
							//};
							var latlngvalue = polygon.getPath().getAt(1).toUrlValue(5).split(",");
							var myLatLng123 = new google.maps.LatLng(latlngvalue[0], latlngvalue[1]);
							for (var i=0;i<infoWindows.length;i++) {
							infoWindows[i].close();
							};
							infowindow.setContent(content);
							infowindow.setPosition(myLatLng123);
							infowindow.open(map);
						   
						};
					})(polygon,content,infowindow)); 
		}
	});

	$.getJSON('php/pushObstacles.php?_=' + time1, function(data) {
		var o = 0;
		for (var ji in data) {
			var point = new google.maps.LatLng(data[ji].lat, data[ji].lng);
			if (data[ji].image_link == null) {
				var image_url = '';
				var image_url1 = '', image_url2 = '';
				var images_1 = '', images_2 = '';
				//data[i].image_link = '';
			} else {
				//alert(data[i].image_link);
				var images = data[ji].image_link.split(";");
				var image_url1 = "target='_blank' href='../../images/" + images[0] + "'";
				var images_1 = images[0];
				//alert(images[1]);
				if ( typeof images[1] === "undefined") {
					var image_url2 = '';
					var images_2 = '';
				} else {
					//console.log(images[1]);
					var image_url2 = "target='_blank' href='../../images/" + images[1] + "'";
					var images_2 = images[1];
				};
			};

			var obs_status = data[ji].status.replace(" ", "");
			if (obs_status == "1") {
				var content = "<table style='width:100%;font-size:15px;table-layout:fixed;'>" + 
				"<tr><td><strong>Obstacle ID: </strong></td><td><address>" + data[ji].obstacle_name + "</address></td></tr>" + 
				"<tr><td class='sum_table1'><strong>Location: </strong></td><td class='sum_table2'><address>"+ data[ji].obs_location + 
				"</address></td></tr>" + "<tr><td class='sum_table1'><strong>Obstacle comment: </strong></td><td class='sum_table2'><address>" + data[ji].obs_com + 
				"</address></td></tr>" + "<tr><td><strong>Included reports: </strong></td><td class='sum_table2'><address>" + data[ji].obs_reports + "</address></td></tr>" + 
				"<tr><td><strong>Obstacle type: </strong></td><td class='sum_table2'><address>" + data[ji].obstacle_type + "</address></td></tr>" +
				"<tr><td><strong>Image: </strong></td><td class='sum_table2'><a " + image_url1 + ">" + images_1 + "</a>	<a " + image_url2 + ">" + images_2 + 
				"</a></td></tr>" + "<tr><td><strong>Status: </strong></td><td class='sum_table2'><address>Confirmed</address></td></tr><tr><td colspan='2'>" +
				"<input id='obs_remove' type='button' style='display:none' value='Report obstacle removed' onclick='obs_remove(&#39;" + data[ji].obstacle_name + "&#39;, &#39;obstacle" + ji + 
				"&#39;, &#39;" + data[ji].obs_reports + "&#39;, 1, " + o + ")'/></td></tr></table>";
				
				var marker = new google.maps.Marker({map : map, 
					position : point, 
					icon: 'images/accesdenied.png'});
				//map.addMarker(createMarker(content,point));
				//var infowindow;
				var infowindow = new google.maps.InfoWindow();
				infoWindows.push(infowindow); 
				//markers_3.push(marker);
				markers_obstacle.push(marker);
				
				google.maps.event.addListener(marker,'click', (function(marker,content,infowindow){ 
						return function() {
							for (var i=0;i<infoWindows.length;i++) {
							infoWindows[i].close();
							};
						   infowindow.setContent(content);
						   infowindow.open(map,marker);
						};
					})(marker,content,infowindow)); 		
				o++;
			};

		}
	});

	$.getJSON('php/obs/pushobs.php?_=' + time1, function(data) {
		var o = 0;
		for (var ji in data) {
			var point = new google.maps.LatLng(data[ji].lat, data[ji].lng);
			if (data[ji].image_link == null) {
				var image_url = '';
				var image_url1 = '', image_url2 = '';
				var images_1 = '', images_2 = '';
				//data[i].image_link = '';
			} else {
				//alert(data[i].image_link);
				var images = data[ji].image_link.split(";");
				var image_url1 = "target='_blank' href='../../images/" + images[0] + "'";
				var images_1 = images[0];
				//alert(images[1]);
				if ( typeof images[1] === "undefined") {
					var image_url2 = '';
					var images_2 = '';
				} else {
					//console.log(images[1]);
					var image_url2 = "target='_blank' href='../../images/" + images[1] + "'";
					var images_2 = images[1];
				};
			};

			var obs_status = data[ji].status.replace(" ", "");
			if (obs_status == "1") {
				var content = "<table style='width:100%;font-size:15px;table-layout:fixed;'>" + 
				"<tr><td><strong>Obstacle ID: </strong></td><td><address>" + data[ji].obstacle_name + "</address></td></tr>" + 
				"<tr><td class='sum_table1'><strong>Location: </strong></td><td class='sum_table2'><address>"+ data[ji].obs_location + "</address></td></tr>" + 
				"<tr><td class='sum_table1'><strong>Obstacle comment: </strong></td><td class='sum_table2'><address>" + data[ji].obs_com + "</address></td></tr>" + 
				//"<tr><td><strong>Included reports: </strong></td><td class='sum_table2'><address>" + data[ji].obs_reports + "</address></td></tr>" + 
				"<tr><td><strong>Obstacle type: </strong></td><td class='sum_table2'><address>" + data[ji].obstacle_type + "</address></td></tr>" +
				"<tr><td><strong>Image: </strong></td><td class='sum_table2'><a " + image_url1 + ">" + images_1 + "</a>	<a " + image_url2 + ">" + images_2 + "</a></td></tr>" + 
				"<tr><td><strong>Status: </strong></td><td class='sum_table2'><address>Confirmed</address></td></tr>"+
				"<tr><td><strong>QA final score: </strong></td><td class='sum_table2'><address>" + data[ji].qa_final + "</address></td></tr>"+
				"<tr><td><strong>close time: </strong></td><td class='sum_table2'><address>" + data[ji].close_time + "</address></td></tr>"+
				"<tr><td colspan='2'><input id='obs_remove' type='button' style='display:none' value='Report obstacle removed' onclick='obs_remove(&#39;" + data[ji].obstacle_name + "&#39;, &#39;obstacle" + ji + 
				"&#39;, &#39;" + data[ji].obs_reports + "&#39;, 1, " + o + ")'/></td></tr></table>";
				
				var marker = new google.maps.Marker({map : map, 
					position : point, 
					icon: 'images/accesdenied.png'});
				//map.addMarker(createMarker(content,point));
				//var infowindow;
				var infowindow = new google.maps.InfoWindow();
				infoWindows.push(infowindow); 
				//markers_3.push(marker);
				//markers_obstacle.push(marker);
				
				google.maps.event.addListener(marker,'click', (function(marker,content,infowindow){ 
						return function() {
							for (var i=0;i<infoWindows.length;i++) {
							infoWindows[i].close();
							};
						   infowindow.setContent(content);
						   infowindow.open(map,marker);
						};
					})(marker,content,infowindow)); 		
				o++;
			};

		}
	});


	//find the icon
	$('#find_icon').click(function() {
		map.setCenter(find_location);
	});


	marker = new google.maps.Marker({
		map : map,
		draggable : true,
		position : myLatlng,
		animation : google.maps.Animation.DROP,
		icon : image
	});
	//var initialLocation;
	if (navigator.geolocation) {
         navigator.geolocation.getCurrentPosition(function (position) {
            initialLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
			marker.setPosition(initialLocation);
			//alert(position.coords.longitude);
			lat = position.coords.latitude;
			lng = position.coords.longitude;
         });
     }else{
			//38.831033, -77.30474
			lat = 38.831033;
			lng = -77.30474;
	 };
	 
	//lat =  marker.getPosition().lat();

	google.maps.event.addListener(marker, 'drag', function() {
		updateMarkerPosition(marker.getPosition());
		//infowindowL.setContent(null);
	});

	google.maps.event.addListener(marker, 'dragend', function() {
		geocodePosition(marker.getPosition());
		infowindowL.setContent(null);
		checkL = true;
		$("#correctL").show();
		$("#faultL").hide();
	});

	google.maps.event.addListener(marker, 'click', function() {
		var latL = marker.getPosition().lat();
		var lngL = marker.getPosition().lng();
		var contenttext = latL + ',' + lngL;
		infowindowL.setContent(contenttext);
		infowindowL.open(map, marker);
		//geocodePosition(marker.getPosition());
	});
	//upload
	/*$('#upload').click(function(){
	$('input#selfile1').prop('disabled', true);
	$('input#selfile2').prop('disabled', true);
	});*/

	//geolocate
	$('#geolocate').click(function() {
		var address = document.getElementById('input_address').value;
		if (address.toLowerCase().indexOf("fairfax") < 0) {
			address = address + ", fairfax";
		};
		geocoder.geocode({
			'address' : address
		}, function(results, status) {
			if (status == google.maps.GeocoderStatus.OK) {
				map.setCenter(results[0].geometry.location);
				marker.setPosition(results[0].geometry.location);
				find_location = results[0].geometry.location;
			} else {
				alert('Geolocation was not successful for the following reason: ' + status);
			}
		});
	});
	
	//sliders
 //   $( "#slider-range-min" ).slider({
 //     range: "min",
 //     value: 12,
 //     min: 0,
 //     max: 23,
 //     slide: function( event, ui ) {
 //       $( "#amount" ).val(ui.value + ":00");
 //     }
 //   });
 //   $( "#amount" ).val($( "#slider-range-min" ).slider( "value" ) + ":00" );
	//
	//$( "#slider-range-quality" ).slider({
 //     range: "min",
 //     value: 82,
 //     min: 0,
 //     max: 100,
 //     slide: function( event, ui ) {
 //       $( "#amount-quality" ).val(ui.value);
 //     }
 //   });
 //   $( "#amount-quality" ).val($( "#slider-range-quality" ).slider( "value" ));
	
//quality scores slider
	    $( "#slider1" ).slider({
            values:[12, 24],
			range: true,
            min: 0,
            max: 100,
            slide: function( event, ui ) {
                $( "#amount1" ).val( ui.values[0] +" - "+ ui.values[1]);
				setAllMap(null);
				for(var index in markers_all_dir){
					var res = index.split("_", 1);
					res = parseFloat(res); 
					if(res >= ui.values[0] && res <= ui.values[1]){
						markers_all_dir[index].setMap(map);
					}
				}
            }
        });
        $( "#amount1" ).val($( "#slider1" ).slider( "values", 0) + " - " + $( "#slider1" ).slider( "values", 1 ));
		
		
//for time of day slider
        $( "#slider2" ).slider({
            values:[7, 16],
			range: true,
            min: 0,
            max: 24,
            slide: function( event, ui ) {
                $( "#amount2" ).val(ui.values[0] + ":00" +" - "+ ui.values[1] + ":00");
				setAllMap(null);
				for(var index in markers_day_dir){
					var res = index.split("_", 1);
					res = parseFloat(res); 
					if(res >= ui.values[0] && res <= ui.values[1]){
						markers_day_dir[index].setMap(map);
					}
				}
				
            }
        });
        $( "#amount2" ).val($( "#slider2" ).slider( "values", 0 ) + ":00" + " - " + $( "#slider2" ).slider( "values", 1 ) + ":00");
		
		var str = "";
		for(var i = 0;i<25; i++){
			var num = 0;
			num = i*100/24;
			str = str + "<span class='tick' style='left: "+num+"%;'>|<br>"+i+":00</span>";
		}
		//console.log(str);
		$("#slider_label2").html(str);
		
}


// for all records
function setAllMap(map) {
	for (var m = 0; m < markers_all.length; m++) {
		markers_all[m].setMap(map);
	}
};

//for status 1
function setMap_1(map) {
	for (var k = 0; k < markers_1.length; k++) {
		markers_1[k].setMap(map);
	}
};

//for status 2
function setMap_2(map) {
	for (var m = 0; m < markers_2.length; m++) {
		markers_2[m].setMap(map);
	}
};

//for status 3
function setMap_3(map) {
	for (var m = 0; m < markers_3.length; m++) {
		markers_3[m].setMap(map);
	}
};

//for status 6
function setMap_6(map) {
	for (var m = 0; m < markers_6.length; m++) {
		markers_6[m].setMap(map);
	}
};

//for status 5
function setMap_5(map) {
	for (var m = 0; m < markers_5.length; m++) {
		markers_5[m].setMap(map);
	}
};

//for obstacle
function setMap_obs(map) {
	for (var m = 0; m < markers_obstacle.length; m++) {
		markers_obstacle[m].setMap(map);
	}
};


