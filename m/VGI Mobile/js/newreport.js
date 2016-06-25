var map;
var marker;
var geocoder = new google.maps.Geocoder();
var image = 'images/icon.png';

$( document ).on( "pageshow", "#time-location-page", function() {
	
	//initial
	var myLatlng = new google.maps.LatLng(38.831033, -77.30474);
	var mapOptions = {
		zoom : 16,
		center : myLatlng,
		minZoom : 14,
		mapTypeId : google.maps.MapTypeId.ROADMAP,
		disableDefaultUI: true
	};
	map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
	
	loadMarkers();
	loadObstacles();
	
	marker = new google.maps.Marker({
		map : map,
		draggable : true,
		position : myLatlng,
		animation : google.maps.Animation.DROP,
		icon : image
	});
	if (navigator.geolocation) {
         navigator.geolocation.getCurrentPosition(function (position) {
            initialLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
			marker.setPosition(initialLocation);
			map.setCenter(marker.getPosition());
         });
     }
	
	$("#percent").hide();
	
	var options = {
		beforeSend : function() {
			$("#percent").show();
			$("#percent").html("0%");
		},
		uploadProgress : function(event, position, total, percentComplete) {
			$("#percent").html(percentComplete + '%');
		},
		success : function() {
			$("#percent").html('100%');
		},
		complete : function(response) {
			$("#message").html("<font color='green'>" + response.responseText + "</font>");
		},
		error : function() {
			$("#image-uploader").show();
			$("#percent").html("<font color='red'> ERROR: unable to upload files</font>");
		}
	};
	$("#image-upload-form").ajaxForm(options);
});

function loadMarkers() {
	var time1 = new Date().getTime();
	//push all the markers and filter by js
	$.getJSON('../php/pushmarkers.php', function(data) {
		var markerList = new Array();
		for (var i = 0; i < data.length; i++) {
			var point = new google.maps.LatLng(data[i].lat, data[i].lng);
			if (data[i].image_link == null) {
				var image_url = '';
				var image_url1 = '', image_url2 = '';
				var images_1 = '', images_2 = '';
			} else {
				var images = data[i].image_link.split(";");
				if ( typeof images[0] === "undefined" || images[0].trim() == "") {
					var image_url1 = '';
					var images_1 = '';
				}else{	
					var image_url1 = "target='_blank' href='../../images/" + images[0] + "'";
					var images_1 = 'image(1);';
				}
				if ( typeof images[1] === "undefined" || images[1].trim() == "") {
					var image_url2 = '';
					var images_2 = '';
				} else {
					var image_url2 = "target='_blank' href='../../images/" + images[1] + "'";
					var images_2 = 'image(2)';
				};
			};

			var content = data[i].obs_com;
			
			if (image_url1) content = "<img align='left' src='http://geo.gmu.edu/images/" + images[0] + "' style='max-height:3em;margin-right:5px' /> " + content;	
			
			var data_status = data[i].status.replace(" ", "");
			
			if (data_status == "1") {
				var marker = new google.maps.Marker({
					map : map, 
					position : point, 
					icon: 'images/caution_underreview.png'
				});
			} else if (data_status == "2") {
				var marker = new google.maps.Marker({
					map : map, 
					position : point, 
					icon: 'images/caution_process.png'}				
				);
			} else if (data_status == "3") {
				var marker = new google.maps.Marker({
					map : map, 
					position : point, 
					icon: 'images/caution_process.png'
				});
			} else if (data_status == "5") {
				var marker = new google.maps.Marker({
					map : map, 
					position : point, 
					icon: 'images/caution_test.png'
				});
			};
		};
	});
}

$(document).on("pagebeforeshow", "#details-page", function() {
	var obs_types = retrieveObstacleTypes();
	
	$("#obstacle-type-list").html(obs_types.join("<br />"));
});

$(document).on("pagebeforeshow", "#overview-page", function() {
	$("#time-label").html($("#date").val() + " " + $("#time").val());
	$("#loc-description-label").html(marker.getPosition().lat() + "/" + marker.getPosition().lng() + "<br /><br />" + $("#loc-description").val());
	$("#obs-description-label").html($("#obs-description").val());
	$("#duration-label").html($("#duration").val());
	$("#urgency-label").html($("#urgency").val());
	$("#obs-type-label").html(retrieveObstacleTypes().join("<br />"));
});

$(document).on("pageshow", "#image-page", function() {
	$("#submit-button").click(function(event) {
		event.preventDefault();

		var errors = [];
		if ($("#date").val() == '' || $("#time").val() == '') errors.push("Time cannot be blank.");
		if ($("#obs-description").val() == '') errors.push("Obstacle description cannot be blank.");
		if (retrieveObstacleTypes().length == 0) errors.push("Obstacle type cannot be blank.");

		if (errors.length == 0) {
			$.mobile.navigate("#overview-page");
		} else {
			$("#error-label").html(errors.join("<br />"));

			$("#error-popup").popup("open");
		}
	});
});

function loadObstacles() {
	var time1 = new Date().getTime();
	//push all the obstacles and filter by js
	$.getJSON('../php/pushObstacles.php?_=' + time1, function(data) {
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
				var content = data[ji].obs_com;
				
				if (image_url1) content = "<img align='left' src='http://geo.gmu.edu/images/" + images[0] + "' style='max-height:3em;margin-right:5px' /> " + content;
				
				var marker = new google.maps.Marker({
					map : map, 
					position : point, 
					icon: 'images/accesdenied.png'
				});
						
				o++;
			};

		}
	});
	////push all the obstacles and filter by js
	$.getJSON('../php/obs/pushobs.php?_=' + time1, function(data) {
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
			if (obs_status != "0") {
				var content = data[ji].obs_com;
				
				if (image_url1) content = "<img align='left' src='http://geo.gmu.edu/images/" + images[0] + "' style='max-height:3em;margin-right:5px' /> " + content;
				
				var marker = new google.maps.Marker({
					map : map, 
					position : point, 
					icon: 'images/accesdenied.png'
				});
					
				o++;
			};

		}
	});
}

function codeAddress() {
	$("#input_address").blur();
	
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
			// google.maps.event.addListener(marker, 'click', function() {
// 				updateMarkerPosition(marker.getPosition());
// 				geocodePosition(marker.getPosition());
//
// 			google.maps.event.addListener(marker, 'drag', function() {
// 					updateMarkerPosition(marker.getPosition());
// 				});
//
// 			google.maps.event.addListener(marker, 'dragend', function() {
// 					geocodePosition(marker.getPosition());
// 				});
// 			});

		} else {
			alert('Geolocation was not successful for the following reason: ' + status);
		}
	});
}

function locateUser() {
	if (navigator.geolocation) {
         navigator.geolocation.getCurrentPosition(function (position) {
            loc = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
			
			map.setCenter(loc);
			marker.setMap(null);
			marker = new google.maps.Marker({
				map : map,
				draggable : true,
				animation : google.maps.Animation.DROP,
				position : loc,
				icon : image
			});
         });
     }
}

function retrieveObstacleTypes() {
	var types = [];
	if ($("#obs_1_selected").css('display') != 'none') types.push("sidewalk obstruction");
	if ($("#obs_2_selected").css('display') != 'none') types.push("construction detour");
	if ($("#obs_3_selected").css('display') != 'none') types.push("entrance/exit problem");
	if ($("#obs_4_selected").css('display') != 'none') types.push("poor surface condition");
	if ($("#obs_5_selected").css('display') != 'none') types.push("crowd/event");
	if ($("#obs_6_selected").css('display') != 'none') types.push("other");
	return types;
}

function checkObstacleType() {
	$("#obs-type-error").hide();
	if ($("#obs_1_selected").css('display') != 'none') return true;
	if ($("#obs_2_selected").css('display') != 'none') return true;
	if ($("#obs_3_selected").css('display') != 'none') return true;
	if ($("#obs_4_selected").css('display') != 'none') return true;
	if ($("#obs_5_selected").css('display') != 'none') return true;
	if ($("#obs_6_selected").css('display') != 'none') return true;
	$("#obs-type-error").show();
	return false;
}

function checkUserId() {
	if ($("#user-id").val() == '') {
		$("#user-id-error").show();
		return false;
	}
	return true;
}

function submit() {
	if ($("#user-id").val() == '') {
		$("#user-id-error").show();
		return false;
	}
	
	$.mobile.loading("show");
	
	var comple_score;
	var s = 0.0;
	var use_id = $('#user_id').val();
	//var address = $("#address1").text();
	var vallat = marker.getPosition().lat();
	var vallng = marker.getPosition().lng();
	var location_com = $('#loc-description').val();
	var obs_type = retrieveObstacleTypes().join(",");//obstacle types into array
	//var obs_impact = $('#typeImpact option:selected').text();
	var obs_com = $('#obs-description').val();
	var duration = $('#duration option:selected').text();
	var priority = $('#urgency option:selected').text();
	var feedback = $('#feedback').val();
	var currentTime = new Date();
	var month = currentTime.getMonth() + 1;
	var day = currentTime.getDate();
	var year = currentTime.getFullYear();
	var hours = currentTime.getHours();
	var minutes = currentTime.getMinutes();
	$.ajax({
		type : "POST",
		url : "../php/number.php",
		data : {
			type : 'add'
		},
		success : function(response) {
			var report_ini = parseInt(response) + 1;
			var report_id = 'report_000' + report_ini.toString();

			var image_name = $("#message").text().replace(/Uploaded image :/g, '');

			if (minutes < 10) {
				minutes = "0" + minutes
			};
			var finalTime = month + "/" + day + "/" + year + " " + hours + ":" + minutes;
			var reportTime = $('#date').val() + " " + $("#time").val();
						
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
			if (use_id.replace(/\s/g, "") != "") {
				s = s + 2
			};
			// if (address.replace(/\s/g, "") != "") {
// 				s = s + 2
// 			};
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
				url : "../php/database.php",
				data : {
					uid : use_id,
					//z : address,
					x : vallat,
					y : vallng,
					lcom : location_com,
					t : obs_type,
					ocom : obs_com,
					dur  : duration,
					//impact : obs_impact,
					pri : priority,
					feedback : feedback,
					f : finalTime,
					reportTime : reportTime,
					report_id : report_id,
					image : image_name,
					comple_score : comple_score,
				},
				success : function(response) {
					
					$.ajax({
						type : "POST",
						url : "../php/report_remove.php",
						data : {
							rid : report_id
						},
						success : function(response) {
						}
					});
					$.mobile.loading("hide");
					
					$.mobile.navigate("#submitted-page");
				}
			});
		}
	});
}