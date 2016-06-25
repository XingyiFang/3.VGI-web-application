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

function addPoint(e) {
  path.insertAt(path.length, e.latLng);
  //alert(e.latLng);
  var marker_poly =  new google.maps.Marker({
	position: e.latLng,
	map: map,
	draggable: true
  });
  markers_poly.push(marker_poly);
  marker_poly.setTitle("#" + path.length);
  google.maps.event.addListener(marker_poly, 'click', function() {
    marker_poly.setMap(null);
    for (var i = 0, I = markers_poly.length; i < I && markers_poly[i] != marker_poly; ++i);
	markers_poly.splice(i, 1);
	path.removeAt(i);
      }
    );
  google.maps.event.addListener(marker_poly, 'dragend', function() {
      for (var i = 0, I = markers_poly.length; i < I && markers_poly[i] != marker_poly; ++i);
      path.setAt(i, marker_poly.getPosition());
      }
    );
  
  //alert(e.latLng);
};

function HomeControl(controlDiv, map) {

  // Set CSS styles for the DIV containing the control
  // Setting padding to 5 px will offset the control
  // from the edge of the map
  controlDiv.style.paddingRight = '10px';
  controlDiv.style.paddingTop = '5px';
  // Set CSS for the control border
  var controlUI = document.createElement('div');
  controlUI.style.backgroundColor = 'white';
  controlUI.style.borderStyle = 'solid';
  controlUI.style.borderWidth = '2px';
  controlUI.style.cursor = 'pointer';
  controlUI.style.textAlign = 'center';
  controlUI.title = 'active to draw the polygon';
  controlDiv.appendChild(controlUI);

  // Set CSS for the control interior
  var controlText = document.createElement('div');
  controlText.style.fontFamily = 'Arial,sans-serif';
  controlText.style.fontSize = '16px';
  controlText.style.paddingLeft = '4px';
  controlText.style.paddingRight = '4px';
  controlText.innerHTML = '<b>drawing polygon</b>';
  controlUI.appendChild(controlText);

  google.maps.event.addDomListener(controlUI, 'click', function() {
	if (checkdraw == false){
		google.maps.event.addListener(map, 'click', addPoint);
		checkdraw = true;
	}else{
		
		google.maps.event.clearListeners(map, 'click', addPoint);
		checkdraw = false;
	};
  });

};

function HomeControl2(controlDiv, map) {

  // Set CSS styles for the DIV containing the control
  // Setting padding to 5 px will offset the control
  // from the edge of the map
  controlDiv.style.paddingRight = '10px';
  controlDiv.style.paddingTop = '5px';
  // Set CSS for the control border
  var controlUI = document.createElement('div');
  controlUI.style.backgroundColor = 'white';
  controlUI.style.borderStyle = 'solid';
  controlUI.style.borderWidth = '2px';
  controlUI.style.cursor = 'pointer';
  controlUI.style.textAlign = 'center';
  controlUI.title = 'active to draw the polygon';
  controlDiv.appendChild(controlUI);

  // Set CSS for the control interior
  var controlText = document.createElement('div');
  controlText.style.fontFamily = 'Arial,sans-serif';
  controlText.style.fontSize = '16px';
  controlText.style.paddingLeft = '4px';
  controlText.style.paddingRight = '4px';
  controlText.innerHTML = '<b>generate the polygon template</b>';
  controlUI.appendChild(controlText);

  google.maps.event.addDomListener(controlUI, 'click', function() {
	var polygonBounds =  shape.getPath();
	var contentString = "";
	polygonBounds.forEach(function(xy, i) {
		contentString += i + ',' + xy.lat() +',' + xy.lng() + '; ';
	});
	$.ajax({
			type : "POST",
			url : "php/addpolygon.php",
			data : {
				coods: contentString,
			},
			success : function(response) {
				alert("success to add the '"+response+"'");
			}
		});

  });

};

function initialize() {
	timeset();
	$("#records_layer").prop("checked", true);
	$("#obstacles_layer").prop("checked", true);
	$("#records_1").prop("checked", true);
	$("#records_2").prop("checked", true);
	$("#records_6").prop("checked", true);
	$("#records_5").prop("checked", false);
	
	
	var icons = {
		header : "ui-icon-circle-arrow-e",
		activeHeader : "ui-icon-circle-arrow-s"
	};
	$("#accordion").accordion({
		collapsible : true,
		heightStyle : "content",
		icons : icons
	});
	//$( "#time_loc" ).click();
	//back and continue
	$("#continue1").click(function() {
		$("#obs_detail").click();
	});
	$("#continue2").click(function() {
		$("#upload_img").click();
	});
	$("#continue3").click(function() {
		$("#feedback_tab").click();
	});
	$("#back2").click(function() {
		$("#time_loc").click();
	});
	$("#back3").click(function() {
		$("#obs_detail").click();
	});
	$("#back4").click(function() {
		$("#upload_img").click();
	});

	//window size and resize
	widthtotal = $(window).width() * 0.84;
	heighttotal = $("#lefttd").height();
	$("#map_canvas").css("width", widthtotal);
	$("#map_canvas").css("height", heighttotal);

	$(window).resize(function() {
		widthtotal = $(window).width() * 0.84;
		//heighttotal= $("#lefttd").height();
		$("#map_canvas").css("width", widthtotal);
		//$("#map_canvas").css("height",heighttotal);
	});
	//initial
	var myLatlng = new google.maps.LatLng(38.831033, -77.30474);
	var mapOptions = {
		zoom : 16,
		center : myLatlng,
		minZoom : 12,
		mapTypeId : google.maps.MapTypeId.ROADMAP
	};
	map = new google.maps.Map(document.getElementById('map_canvas'), mapOptions);
	
	var homeControlDiv = document.createElement('div');
	var homeControl = new HomeControl(homeControlDiv, map);

	homeControlDiv.index = 1;
	map.controls[google.maps.ControlPosition.TOP_RIGHT].push(homeControlDiv);
	
	var homeControlDiv2 = document.createElement('div');
	var homeControl2 = new HomeControl2(homeControlDiv2, map);

	homeControlDiv2.index = 1;
	map.controls[google.maps.ControlPosition.TOP_RIGHT].push(homeControlDiv2);
	
	shape = new google.maps.Polygon({
		strokeColor: '#ffa500',
		strokeOpacity: 0.8,
		strokeWeight: 1.5,
		fillColor: '#ffa500',
		fillOpacity: 0.35
	});
	shape.setMap(map);
	shape.setPaths(new google.maps.MVCArray([path]));
	
	//new google.maps.LatLngBounds(new google.maps.LatLng(38.81062025741668, -77.3422908782959), new google.maps.LatLng(38.84358502979058, -77.27813243865967));
	// Bounds for North America
	var strictBounds = new google.maps.LatLngBounds(new google.maps.LatLng(38.76062025741668, -77.3922908782959), new google.maps.LatLng(38.89358502979058, -77.17813243865967));

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
		var markerList = new Array();
		var num23 = 0;
		for (var i = 0; i < data.length; i++) {
			//alert(i);
			//var point = new google.maps.LatLng(data[i].lat, data[i].lng);
			if (data[i].mod_image == null) {
				if (data[i].image_link == null) {
				var image_url = '';
				var image_url1 = '', image_url2 = '';
				var images_1 = '', images_2 = '';
				//data[i].image_link = '';
				} else {
					//alert(data[i].image_link);
					var images = data[i].image_link.split(";");
					if ( typeof images[0] === "undefined" || images[0].trim() == "") {
						var image_url1 = '';
						var images_1 = '';
					}else{	
						var image_url1 = "target='_blank' href='../../images/" + images[0] + "'";
						var images_1 = 'image(1);';
					}
					//alert(images[1]);
					if ( typeof images[1] === "undefined" || images[1].trim() == "") {
						var image_url2 = '';
						var images_2 = '';
					} else {
						//console.log(images[1]);
						var image_url2 = "target='_blank' href='../../images/" + images[1] + "'";
						var images_2 = 'image(2)';
					};
				};
			}else{
				var images = data[i].mod_image.split(";");
				if ( typeof images[0] === "undefined" || images[0].trim() == "") {
					var image_url1 = '';
					var images_1 = '';
				}else{	
					var image_url1 = "target='_blank' href='../../images/" + images[0] + "'";
					var images_1 = 'image(1);';
				}
					//alert(images[1]);
				if ( typeof images[1] === "undefined" || images[1].trim() == "") {
					var image_url2 = '';
					var images_2 = '';
				} else {
						//console.log(images[1]);
					var image_url2 = "target='_blank' href='../../images/" + images[1] + "'";
					var images_2 = 'image(2)';
				};
			};
			var data_status = data[i].status.replace(" ", "");
			var status_text = '';
			if (data_status == "1") {
				var point = new google.maps.LatLng(data[i].lat, data[i].lng);
				status_text = "submitted/in process/under review";
			}else if (data_status == "2") {
				var point = new google.maps.LatLng(data[i].mod_lat, data[i].mod_lng);
				status_text = "confirmed";
			}else if (data_status == "3") {
				var point = new google.maps.LatLng(data[i].mod_lat, data[i].mod_lng);
				status_text = "confirmed";
			}else if (data_status == "5") {
				var point = new google.maps.LatLng(data[i].mod_lat, data[i].mod_lng);
				status_text = "closed";
			}else if (data_status == "6") {
				var point = new google.maps.LatLng(data[i].mod_lat, data[i].mod_lng);
				status_text = "official reports";
			};
			var content = "<table style='width:100%;font-size:15px;table-layout:fixed;'>" + 
				"<tr><td><strong>Report ID: </strong></td><td><address id='rep_id'>" + data[i].report_id + "</address></td></tr>" + "<tr><td><strong>Report date: </strong></td><td class='sum_table2'><address>" + 
				data[i].submit_time + "</address></td></tr>" + "<tr><td><strong>Obstacle type: </strong></td><td class='sum_table2'><address>" + data[i].obs_type + 
				"</address></td></tr>" + "<tr><td><strong>Obstacle impact: </strong></td><td class='sum_table2'><address>" + data[i].obs_impact + "</address></td></tr>" + 
				"<tr><td><strong>Image: </strong></td><td class='sum_table2'><a " + image_url1 + ">" + images_1 + "</a>	<a " + image_url2 + ">" + images_2 + "</a></td></tr>" + 
				"<tr><td><strong>Duration: </strong></td><td class='sum_table2'><address>" + data[i].duration + "</address></td></tr>" + "<tr><td><strong>Urgency: </strong></td><td class='sum_table2'><address>" + 
				data[i].priority + "</address></td></tr>" + "<tr><td><strong>Location Comment: </strong></td><td class='sum_table2'><address>" + data[i].location_com + "</address></td></tr>" + 
				"<tr><td><strong>Obstacle Comment: </strong></td><td class='sum_table2'><address>" + data[i].obs_com + "</address></td></tr>" + 
				"<tr><td><strong>Status: </strong></td><td class='sum_table2'><address>" + status_text + "</address></td></tr>" + 
				"<tr><td colspan='2'><input id='rep_confirm' type='button' value='Confirm this report' onclick='rep_confirm(&#39;" + data[i].report_id + "&#39;)'/></td></tr></table>";			
			//var data_status = data[i].status.replace(" ", "");
			var obs_group = data[i].obs_group;
			var check_obs = true;
			if(obs_group && obs_group.trim()!="")
			{
				check_obs = false;
			};
			//console.log(obs_group);
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
				num23 = num23 + 1;
				google.maps.event.addListener(marker,'click', (function(marker,content,infowindow){ 
						return function() {
							for (var i=0;i<infoWindows.length;i++) {
							infoWindows[i].close();
							};
						   infowindow.setContent(content);
						   infowindow.open(map,marker);
						};
					})(marker,content,infowindow)); 
				
			}else if (data_status == "2" && check_obs){
				var marker = new google.maps.Marker({
					map : map, 
					position : point, 
					icon: 'images/caution_process.png'}				
				);
				//map.addMarker(createMarker(content,point));
				//var infowindow;
				var infowindow = new google.maps.InfoWindow();
				infoWindows.push(infowindow); 
				markers_2.push(marker);
				markers_all.push(marker);
				
				google.maps.event.addListener(marker,'click', (function(marker,content,infowindow){ 
						return function() {
							for (var i=0;i<infoWindows.length;i++) {
							infoWindows[i].close();
							};
						   infowindow.setContent(content);
						   infowindow.open(map,marker);
						};
					})(marker,content,infowindow)); 
					
				num23 = num23 + 1;
			}else if (data_status == "3" && check_obs){
				var marker = new google.maps.Marker({map : map, 
					position : point, 
					icon: 'images/caution_process.png'});
				//map.addMarker(createMarker(content,point));
				//var infowindow;
				var infowindow = new google.maps.InfoWindow();
				infoWindows.push(infowindow); 
				markers_3.push(marker);
				markers_all.push(marker);
				
				google.maps.event.addListener(marker,'click', (function(marker,content,infowindow){ 
						return function() {
							for (var i=0;i<infoWindows.length;i++) {
							infoWindows[i].close();
							};
						   infowindow.setContent(content);
						   infowindow.open(map,marker);
						};
					})(marker,content,infowindow)); 
				num23 = num23 + 1;
			}else if (data_status == "5"){
				var marker = new google.maps.Marker({map : map, 
					position : point, 
					icon: 'images/caution_test.png'});
				
				var infowindow = new google.maps.InfoWindow();
				infoWindows.push(infowindow); 
				markers_5.push(marker);
				markers_all.push(marker);
				
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
				num23 = num23 + 1;
				var infowindow = new google.maps.InfoWindow();
				infoWindows.push(infowindow); 
				markers_6.push(marker);
				markers_all.push(marker);
				
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
		clearlays_5();
		console.log(num23);
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
				strokeColor: '#FFA500',
				strokeOpacity: 0.8,
				strokeWeight: 2,
				fillColor: '#FFA500',
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

/*	$.getJSON('php/pushObstacles.php?_=' + time1, function(data) {
		var o = 0;
		for (var ji in data) {
			var point = new google.maps.LatLng(data[ji].lat, data[ji].lng);
			if (data[ji].image_link == null) {
				var image_url = '';
				var image_url1 = '', image_url2 = '';
				var images_1 = '', images_2 = '';
				} else {
				var images = data[ji].image_link.split(";");
				var image_url1 = "target='_blank' href='../../images/" + images[0] + "'";
				var images_1 = images[0];
				
				if ( typeof images[1] === "undefined") {
					var image_url2 = '';
					var images_2 = '';
				} else {
					
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
				
				var infowindow = new google.maps.InfoWindow();
				infoWindows.push(infowindow); 
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
	});*/

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
			if (obs_status != "5") {
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

	var options = {
		beforeSend : function() {
			$("#progress").show();
			//clear everything
			$("#bar").width('0%');
			$("#message").html("");
			$("#percent").html("0%");
		},
		uploadProgress : function(event, position, total, percentComplete) {
			$("#bar").width(percentComplete + '%');
			$("#percent").html(percentComplete + '%');
		},
		success : function() {
			$("#bar").width('100%');
			$("#percent").html('100%');
		},
		complete : function(response) {
			$("#message").html("<font color='green'>" + response.responseText + "</font>");
			$('input#selfile1').prop('disabled', true);
			$('input#selfile2').prop('disabled', true);
		},
		error : function() {
			$("#message").html("<font color='red'> ERROR: unable to upload files</font>");
		}
	};
	$("#myForm").ajaxForm(options);

	$('#datetimepicker').datetimepicker({
		timeFormat : "hh:mm tt"
	});

	//login
	$('#submit_id').click(function() {
		if ($('#use_id__').val() == "admin" && $('#password').val() == "CGDphase2") {
			$('#info').hide();
			$('#test').show();
		}
	});

	//class='hide_show'
	$(".obs_des").click(function() {
		if ($('#obs_des').is(':visible')) {
			$("#obs_des").hide();
		} else {
			$("#obs_des").show();
		}
	});
	$(".time_des").click(function() {
		if ($('#time_des').is(':visible')) {
			$("#time_des").hide();
		} else {
			$("#time_des").show();
		}
	});
	$(".id_des").click(function() {
		if ($('#id_des').is(':visible')) {
			$("#id_des").hide();
		} else {
			$("#id_des").show();
		}
	});

	//find the icon
	$('#find_icon').click(function() {
		map.setCenter(find_location);
	});

	//
	$('.input_address').focusin(function() {
		if (this.value == 'Search place') {
			this.value = '';
			$('.input_address').css("color", "black");
			$('.input_address').css("font-style", "normal");
			$('.input_address').css("font-size", "1em");
			$('.input_address').css("font-family", "Verdana,Arial,sans-serif");
		}
	}).focusout(function() {
		if (this.value == '') {
			this.value = 'Search place';
			$('.input_address').css("color", "#999");
			$('.input_address').css("font-style", "italic");
			$('.input_address').css("font-size", "12px");
			$('.input_address').css("font-family", "cambria");
		}
	});
	$('.location_com').focusin(function() {
		if (this.value == 'Describe the Location') {
			this.value = '';
			$('.location_com').css("color", "black");
			$('.location_com').css("font-style", "normal");
			$('.location_com').css("font-size", "1em");
			$('.location_com').css("font-family", "Verdana,Arial,sans-serif");
			//font-size:12px; font-family: cambria;font-style:italic; color:#999
		}
	}).focusout(function() {
		if (this.value == '') {
			this.value = 'Describe the Location';
			$('.location_com').css("color", "#999");
			$('.location_com').css("font-style", "italic");
			$('.location_com').css("font-size", "12px");
			$('.location_com').css("font-family", "cambria");
		}
	});
	//submit results
	$(".next_submit").click(function() {
		var use_id = $('#use_id').val();
		var address = $("#address1").text();
		var vallat = lat.toFixed(6);
		var vallng = lng.toFixed(6);
		var location_com = $('#location_com').val();
		var obs_type = $('#selType').val() || [].join(", ");
		var obs_impact = $('#typeImpact option:selected').text();
		var obs_com = $('#obs_com').val();
		var duration = $('#selDur option:selected').text();
		var priority = $('#selPriority option:selected').text();
		var Obscomments = $('#obs_com').val();
		var feedback = $('#feedback').val();
		var currentTime = new Date();
		var month = currentTime.getMonth() + 1;
		var day = currentTime.getDate();
		var year = currentTime.getFullYear();
		var hours = currentTime.getHours();
		var minutes = currentTime.getMinutes();

		if (checkL) {
			if (use_id.replace(/^\s+|\s+$/g, "").length == 0 || obs_type == "") {
				alert("Please input user ID or Obstacle type, thanks!");
			} else {
				$.ajax({
					type : "POST",
					url : "php/number.php",
					data : {
						type : 'call'
					},
					success : function(response) {
						//alert(response);
						var image_name = $("#message").text().replace(/Uploaded image :/g, '');
						//alert(image_name);
						console.log(image_name);
						var report_ini = parseInt(response) + 1;
						var report_id = 'report_000' + report_ini.toString();
						if (minutes < 10) {
							minutes = "0" + minutes
						};
						var finalTime = month + "/" + day + "/" + year + " " + hours + ":" + minutes;
						var strtable = "<table style='width:100%;font-size:15px;table-layout:fixed;'>" + "<tr><td><strong>Report ID: </strong></td><td><address>" + report_id + "</address></td></tr>" + "<tr><td class='sum_table1'><strong>User ID: </strong></td><td class='sum_table2'><address>" + use_id + "</address></td></tr>" + "<tr><td><strong>Report date: </strong></td><td class='sum_table2'><address>" + finalTime + "</address></td></tr>" + "<tr><td><strong>Obstacle type: </strong></td><td class='sum_table2'><address>" + obs_type + "</address></td></tr>" + "<tr><td><strong>Obstacle impact: </strong></td><td class='sum_table2'><address>" + obs_impact + "</address></td></tr>" + "<tr><td><strong>Obstacle location: </strong></td><td class='sum_table2'><address>" + address + "</address></td></tr>" + "<tr><td><strong>Image Name: </strong></td><td class='sum_table2'><address>" + image_name + "</address></td></tr>" + "<tr><td><strong>Describe the obstacle type: </strong></td><td class='sum_table2'><address>" + obs_com + "</address></td></tr>" + "<tr><td><strong>Duration: </strong></td><td class='sum_table2'><address>" + duration + "</address></td></tr>" + "<tr><td><strong>Priority: </strong></td><td class='sum_table2'><address>" + priority + "</address></td></tr>" + "<tr><td><strong>Obstacle Comments: </strong></td><td class='sum_table2'><address>" + Obscomments + "</address></td></tr>" + "<tr><td><strong>General Feedback: </strong></td><td class='sum_table2'><address>" + feedback + "</address></td></tr></table>";
						Boxy.ask(strtable, ["Confirm", "Edit"], function(val) {
							if (val == "Confirm") {
								report_ini++;
								submit1();
							}
						}, {
							title : "Summary"
						});
						return false;
					}
				});
			};
			//alert(checkL);
		} else {
			if (confirm('Have you placed the location icon L in the right place?')) {
				if (use_id.replace(/^\s+|\s+$/g, "").length == 0 || obs_type == "") {
					alert("Please input user ID or Obstacle type, thanks!");
				} else {
					$.ajax({
						type : "POST",
						url : "php/number.php",
						data : {
							type : 'call'
						},
						success : function(response) {
							//alert(response);
							var image_name = $("#message").text().replace(/Uploaded image :/g, '');
							console.log(image_name);
							var report_ini = parseInt(response) + 1;
							var report_id = 'report_000' + report_ini.toString();
							if (minutes < 10) {
								minutes = "0" + minutes
							};
							var finalTime = month + "/" + day + "/" + year + " " + hours + ":" + minutes;
							var strtable = "<table style='width:100%;font-size:15px;table-layout:fixed;'>" + "<tr><td><strong>Report ID: </strong></td><td><address>" + report_id + "</address></td></tr>" + "<tr><td class='sum_table1'><strong>User ID: </strong></td><td class='sum_table2'><address>" + use_id + "</address></td></tr>" + "<tr><td><strong>Report date: </strong></td><td class='sum_table2'><address>" + finalTime + "</address></td></tr>" + "<tr><td><strong>Obstacle type: </strong></td><td class='sum_table2'><address>" + obs_type + "</address></td></tr>" + "<tr><td><strong>Obstacle impact: </strong></td><td class='sum_table2'><address>" + obs_impact + "</address></td></tr>" + "<tr><td><strong>Obstacle location: </strong></td><td class='sum_table2'><address>" + address + "</address></td></tr>" + "<tr><td><strong>Image Name: </strong></td><td class='sum_table2'><address>" + image_name + "</address></td></tr>" + "<tr><td><strong>Describe the obstacle type: </strong></td><td class='sum_table2'><address>" + obs_com + "</address></td></tr>" + "<tr><td><strong>Duration: </strong></td><td class='sum_table2'><address>" + duration + "</address></td></tr>" + "<tr><td><strong>Priority: </strong></td><td class='sum_table2'><address>" + priority + "</address></td></tr>" + "<tr><td><strong>Obstacle Comments: </strong></td><td class='sum_table2'><address>" + Obscomments + "</address></td></tr>" + "<tr><td><strong>General Feedback: </strong></td><td class='sum_table2'><address>" + feedback + "</address></td></tr></table>";
							Boxy.ask(strtable, ["Confirm", "Edit"], function(val) {
								if (val == "Confirm") {
									report_ini++;
									submit1();
								}
							}, {
								title : "Summary"
							});
							return false;
						}
					});
				};
			} else {

			}
		};
	});

	$("#records_layer").change(function() {
		if (this.checked) {
			//alert("12");
			showOverlays();
			document.getElementById("records_1").checked = true;
			document.getElementById("records_2").checked = true;
			document.getElementById("records_5").checked = true;
			document.getElementById("records_6").checked = true;
		} else {
			clearOverlays();
			document.getElementById("records_1").checked = false;
			document.getElementById("records_2").checked = false;
			document.getElementById("records_5").checked = false;
			document.getElementById("records_6").checked = false;
			//alert("aiyo");
		}
	});

	$("#records_1").change(function() {
		if (this.checked) {
			showlays_1();
		} else {
			clearlays_1();
		}
	});

	$("#records_2").change(function() {
		if (this.checked) {
			showlays_2();
			showlays_3();
		} else {
			clearlays_2();
			clearlays_3();
		}
	});
	
	$("#records_6").change(function() {
		if (this.checked) {
			showlays_6();
		} else {
			clearlays_6();
		}
	});
	
	$("#records_5").change(function() {
		if (this.checked) {
			showlays_5();
		} else {
			clearlays_5();
		}
	});



	$("#obstacles_layer").change(function() {
		if (this.checked) {
			showlays_obs();
			//alert("12");
			//showOverlays();
		} else {
			clearlays_obs();
			//clearOverlays();
			//alert("aiyo");
		}
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
	
	//export2kml
	$('#export2kml').click(function(){
		$.ajax({
						type : "POST",
						url : "php/exportToKML.php",
						success : function(response) {
							window.location = 'php/obstacles.kml';
						}
				});
	});
	
	//export2csv
	$('#export2csv').click(function(){
		$.ajax({
						type : "POST",
						url : "php/exportToCSV.php",
						success : function(response) {
							window.location = '../images/obstacles.csv';
						}
				});
	});
	
};


function submit1() {
	var comple_score;
	var s = 0.0;
	var use_id = $('#use_id').val();
	var address = $("#address1").text();
	var vallat = lat;
	var vallng = lng;
	var location_com = $('#location_com').val();
	var obs_type = $('#selType').val() || [].join(",");
	var obs_impact = $('#typeImpact option:selected').text();
	var obs_com = $('#obs_com').val();
	var duration = $('#selDur option:selected').text();
	var priority = $('#selPriority option:selected').text();
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
		data : {
			type : 'add'
		},
		success : function(response) {
			//alert(obs_type);
			//var image_name = $("#message").text().replace('Uploaded File :','');
			var report_ini = parseInt(response) + 1;
			var report_id = 'report_000' + report_ini.toString();

			var image_name = $("#message").text().replace(/Uploaded image :/g, '');

			if (minutes < 10) {
				minutes = "0" + minutes
			};
			var finalTime = month + "/" + day + "/" + year + " " + hours + ":" + minutes;
			var reportTime = $('#datetimepicker').val();
						
			if (reportTime.indexOf("am") > -1) {
				reportTime = reportTime.replace('am','').trim();
			}else if (reportTime.indexOf("pm") > -1){
				String.prototype.replaceAt=function(index, character) {
					return this.substr(0, index) + character + this.substr(index+character.length);
				};
				var index = reportTime.indexOf(":");
				var replace_str = parseInt(reportTime.charAt(index - 2) + reportTime.charAt(index - 1));
				reportTime = reportTime.replaceAt(index - 2, (replace_str + 12).toString());
				reportTime = reportTime.replace('pm','').trim();
			};
			//if (hours > 11) {
				//var finalTime = month + "/" + day + "/" + year + " " + hours + ":" + minutes + " PM";
				//var reportTime = $('#datetimepicker').val();
			//} else {
				//var finalTime = month + "/" + day + "/" + year + " " + hours + ":" + minutes + " AM";
				//var reportTime = $('#datetimepicker').val();
			//}
			if (use_id.replace(/\s/g, "") != "") {
				s = s + 2
			};
			if (address.replace(/\s/g, "") != "") {
				s = s + 2
			};
			if (location_com.replace(/\s/g, "") != "") {
				s = s + 2
			};
			if (0 < obs_type.length) {
				s = s + 2
			};
			if (obs_com.replace(/\s/g, "") != "") {
				s = s + 2
			};
			if (duration.replace(/\s/g, "") != "") {
				s = s + 2
			};
			if (priority.replace(/\s/g, "") != "") {
				s = s + 2
			};
			if (feedback.replace(/\s/g, "") != "") {
				s = s + 2
			};
			if (image_name.replace(/\s/g, "") != "") {
				s = s + 2
			};
			if (reportTime.replace(/\s/g, "") != "") {
				s = s + 2
			};
			comple_score = 5 * s;

			$.ajax({
				type : "POST",
				url : "php/database.php",
				data : {
					uid : use_id,
					z : address,
					x : vallat,
					y : vallng,
					lcom : location_com,
					t : obs_type,
					ocom : obs_com,
					dur : duration,
					impact : obs_impact,
					pri : priority,
					feedback : feedback,
					f : finalTime,
					reportTime : reportTime,
					report_id : report_id,
					image : image_name,
					/*						images_1 : images_1,
					 images_2 : images_2,
					 image_org1: images_org1,
					 image_org2: images_org2,*/
					comple_score : comple_score,
				},
				success : function(response) {
					console.log(vallat);
					console.log(vallng);
					if (image_name == '') {
						var image_url = '';
						var image_url1 = '', image_url2 = '';
						var images_1 = '', images_2 = '';
					} else {
						//alert(data[i].image_link);
						var images = image_name.split(";");
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

					if (vallat == '' || vallng == '') {
						alert('please move the tag again with the infowindow open!');
					} else {
						var fLatlng = new google.maps.LatLng(vallat, vallng);
						eval("var marker_fake" + j + ";");
						eval("var image = 'images/caution_underreview.png';");
						eval("infowindow=new google.maps.InfoWindow({size : new google.maps.Size(150, 100)});");

						eval("marker_fake" + j + "= new google.maps.Marker({map : map,position : fLatlng,icon: image});");

						eval("google.maps.event.addListener(marker_fake" + j + ",'click',function(){infowindow.setContent(\"" + "<table style='width:100%;font-size:15px;table-layout:fixed;'>" + "<tr><td><strong>Report ID: </strong></td><td><address>" + report_id + "</address></td></tr>" + "<tr><td class='sum_table1'><strong>Location: </strong></td><td class='sum_table2'><address>" + address + "</address></td></tr>" + "<tr><td><strong>Latitude/Longitude: </strong></td><td class='sum_table2'><address>" + Number(vallat).toFixed(5) + ", " + Number(vallng).toFixed(5) + "</address></td></tr>" + "<tr><td><strong>Report date: </strong></td><td class='sum_table2'><address>" + finalTime + "</address></td></tr>" + "<tr><td><strong>Obstacle type: </strong></td><td class='sum_table2'><address>" + obs_type + "</address></td></tr>" + "<tr><td><strong>Obstacle impact: </strong></td><td class='sum_table2'><address>" + obs_impact + "</address></td></tr>" + "<tr><td><strong>Image: </strong></td><td class='sum_table2'><a " + image_url1 + ">" + images_1 + "</a>	<a " + image_url2 + ">" + images_2 + "</a></td></tr>" + "<tr><td><strong>Duration: </strong></td><td class='sum_table2'><address>" + duration + "</address></td></tr>" + "<tr><td><strong>Urgency: </strong></td><td class='sum_table2'><address>" + priority + "</address></td></tr>" + "<tr><td><strong>Comments: </strong></td><td class='sum_table2'><address>" + feedback + "</address></td></tr>" + "<tr><td><strong>Status: </strong></td><td class='sum_table2'><address>under review</address></td></tr></table>" + "\");infowindow.open(map, marker_fake" + j + ");});");
						eval("markers_all.push(marker_fake" + j + ");");
						j = j + 1;
						alert('Thank you for adding this obstacle report.');
						$('#location_com').val('');
						$('#obs_com').val('');
						$('#feedback').val('');
						$("#selType").val([]);
						$('#typeImpact').prop('selectedIndex', 0);
						$('#selDur').prop('selectedIndex', 0);
						$('#selPriority').prop('selectedIndex', 0);
						$('input#selfile1').prop('disabled', false);
						$('input#selfile2').prop('disabled', false);
						$('input#selfile2').val('');
						$('input#selfile1').val('');
						$("#bar").width('0%');
						$("#message").html("");
						$("#percent").html("0%");
						timeset();

						$.ajax({
							type : "POST",
							url : "php/report_remove.php",
							data : {
								rid : report_id
							},
							success : function(response) {
								//alert('123');
							}
						});
						//$('#tabs-6').hide();
					}
				}
			});
		}
	});
	//var report_id = 'report_000'+ report_ini;
}

function codeAddress() {
	var address = document.getElementById('input_address').value;
	if (address.toLowerCase().indexOf("fairfax") < 0) {
		address = address + ", fairfax";
	};
	geocoder.geocode({
		'address' : address
	}, function(results, status) {
		if (status == google.maps.GeocoderStatus.OK) {
			map.setCenter(results[0].geometry.location);
			marker.setMap(null);
			marker = new google.maps.Marker({
				map : map,
				draggable : true,
				animation : google.maps.Animation.DROP,
				position : results[0].geometry.location,
				icon : image
			});
			google.maps.event.addListener(marker, 'click', function() {
				//infowindowL.open(map, marker);
				updateMarkerPosition(marker.getPosition());
				geocodePosition(marker.getPosition());

				//geocodePosition(marker.getPosition());
				google.maps.event.addListener(marker, 'drag', function() {
					updateMarkerPosition(marker.getPosition());
				});

				google.maps.event.addListener(marker, 'dragend', function() {
					geocodePosition(marker.getPosition());
				});
			});

		} else {
			alert('Geolocation was not successful for the following reason: ' + status);
		}
	});
}

// for all records
function setAllMap(map) {
	for (var m = 0; m < markers_all.length; m++) {
		markers_all[m].setMap(map);
	}
};

function clearOverlays() {
	setAllMap(null);
};

function showOverlays() {
	setAllMap(map);
}

//for obstacles

//for status 1
function setMap_1(map) {
	for (var k = 0; k < markers_1.length; k++) {
		markers_1[k].setMap(map);
	}
};

function clearlays_1() {
	setMap_1(null);
};

function showlays_1() {
	setMap_1(map);
}

//for status 2
function setMap_2(map) {
	for (var m = 0; m < markers_2.length; m++) {
		markers_2[m].setMap(map);
	}
};

function clearlays_2() {
	setMap_2(null);
};

function showlays_2() {
	setMap_2(map);
}

//for status 3
function setMap_3(map) {
	for (var m = 0; m < markers_3.length; m++) {
		markers_3[m].setMap(map);
	}
};

function clearlays_3() {
	setMap_3(null);
};

function showlays_3() {
	setMap_3(map);
}

//for status 6
function setMap_6(map) {
	for (var m = 0; m < markers_6.length; m++) {
		markers_6[m].setMap(map);
	}
};

function clearlays_6() {
	setMap_6(null);
};

function showlays_6() {
	setMap_6(map);
}

//for status 5
function setMap_5(map) {
	for (var m = 0; m < markers_5.length; m++) {
		markers_5[m].setMap(map);
	}
};

function clearlays_5() {
	setMap_5(null);
};

function showlays_5() {
	setMap_5(map);
}

//for obstacle
function setMap_obs(map) {
	for (var m = 0; m < markers_obstacle.length; m++) {
		markers_obstacle[m].setMap(map);
	}
};

function clearlays_obs() {
	setMap_obs(null);
};

function showlays_obs() {
	setMap_obs(map);
}

function click_tabs() {
	widthtotal = $(window).width();
	//li width
	widthli = widthtotal * 0.09 + "px";
	jQuery('#menu_tab_1').addClass('clicktab_1');
	jQuery('#menu_tab_2').addClass('clicktab_2');
	jQuery('#menu_tab_3').addClass('clicktab_3');
	jQuery('#menu_tab_4').addClass('clicktab_4');
	jQuery('#menu_tab_5').addClass('clicktab_5');
	jQuery('#menu_tab_6').addClass('clicktab_6');
	$(".clicktab_1").click(function() {
		if (g_animation) {
			return false
		};
		var pos = position.left + widthtotal * 0.09;
		var mov = pos + "px";
		$('#tabs-2').hide();
		$('#tabs-3').hide();
		$('#tabs-4').hide();
		$('#tabs-5').hide();
		$('#tabs-6').hide();
		$('#tabs-1').css({
			'marginLeft' : mov
		});
		$('#tabs-1').show();
		$('#tabs-1').animate({
			'marginLeft' : "-=" + widthli
		}, {
			start : function() {
				g_animation = true
			},
			done : function() {
				g_animation = false
			}
		});
	});
	$(".clicktab_2").click(function() {
		if (g_animation) {
			return false
		};
		var pos = position.left + widthtotal * 0.18;
		var mov = pos + "px";
		$('#tabs-1').hide();
		$('#tabs-3').hide();
		$('#tabs-4').hide();
		$('#tabs-5').hide();
		$('#tabs-6').hide();
		$('#tabs-2').css({
			'marginLeft' : mov
		});
		$('#tabs-2').show();
		$('#tabs-2').animate({
			'marginLeft' : "-=" + widthli
		}, {
			start : function() {
				g_animation = true
			},
			done : function() {
				g_animation = false
			}
		});
	});
	$(".clicktab_3").click(function() {
		if (g_animation) {
			return false
		};
		var pos = position.left + widthtotal * 0.27;
		var mov = pos + "px";
		$('#tabs-2').hide();
		$('#tabs-1').hide();
		$('#tabs-4').hide();
		$('#tabs-5').hide();
		$('#tabs-6').hide();
		$('#tabs-3').css({
			'marginLeft' : mov
		});
		$('#tabs-3').show();
		$('#tabs-3').animate({
			'marginLeft' : "-=" + widthli
		}, {
			start : function() {
				g_animation = true
			},
			done : function() {
				g_animation = false
			}
		});
	});
	$(".clicktab_4").click(function() {
		if (g_animation) {
			return false
		};
		var pos = position.left + widthtotal * 0.36;
		var mov = pos + "px";
		$('#tabs-2').hide();
		$('#tabs-3').hide();
		$('#tabs-1').hide();
		$('#tabs-5').hide();
		$('#tabs-6').hide();
		$('#tabs-4').css({
			'marginLeft' : mov
		});
		$('#tabs-4').show();
		$('#tabs-4').animate({
			'marginLeft' : "-=" + widthli
		}, {
			start : function() {
				g_animation = true
			},
			done : function() {
				g_animation = false
			}
		});
	});
	$(".clicktab_5").click(function() {
		if (g_animation) {
			return false
		};
		var pos = position.left + widthtotal * 0.45;
		var mov = pos + "px";
		$('#tabs-2').hide();
		$('#tabs-3').hide();
		$('#tabs-4').hide();
		$('#tabs-1').hide();
		$('#tabs-6').hide();
		$('#tabs-5').css({
			'marginLeft' : mov
		});
		$('#tabs-5').show();
		$('#tabs-5').animate({
			'marginLeft' : "-=" + widthli
		}, {
			start : function() {
				g_animation = true
			},
			done : function() {
				g_animation = false
			}
		});
	});
	$(".clicktab_6").click(function() {
		if (g_animation) {
			return false
		};
		var pos = position.left + widthtotal * 0.36;
		var mov = pos + "px";
		$('#tabs-2').hide();
		$('#tabs-3').hide();
		$('#tabs-4').hide();
		$('#tabs-1').hide();
		$('#tabs-5').hide();
		$('#tabs-6').css({
			'marginLeft' : mov
		});
		$('#tabs-6').show();
		$('#tabs-6').animate({
			'marginLeft' : "+=" + widthli
		}, {
			start : function() {
				g_animation = true
			},
			done : function() {
				g_animation = false
			}
		});
	});
}