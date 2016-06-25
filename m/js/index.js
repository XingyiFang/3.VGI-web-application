var map;
var markers_all = [];
var markers_1 = [];
var markers_2 = [];
var markers_3 = [];
var markers_5 = [];
var markers_obstacle = [];
var infoWindows = [];

$( document ).on( "pagecreate", "#map-page", function() {
	
	document.body.addEventListener('touchmove', function(e){ e.preventDefault(); });
	
	$("#desc-popup").hide();
	
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
	
	$("#desc-popup-close").click(function() {
		$("#desc-popup").hide();
	});
	
	$("#records_layer").change(function() {
		if (this.checked) {
			showOverlays();
			document.getElementById("records_1").checked = true;
			document.getElementById("records_2").checked = true;
			document.getElementById("records_5").checked = true;
		} else {
			clearOverlays();
			document.getElementById("records_1").checked = false;
			document.getElementById("records_2").checked = false;
			document.getElementById("records_5").checked = false;
		}
		$("#records_1").checkboxradio("refresh");
		$("#records_2").checkboxradio("refresh");
		$("#records_5").checkboxradio("refresh");
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
		} else {
			clearlays_obs();
		}
	});
	
	loadMarkers();
	loadObstacles();
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
				
				markers_1.push(marker);
				markers_all.push(marker);

				google.maps.event.addListener(marker, 'click', (function(marker,content) {
					return function() {
						$("#desc-popup-text").html(content);
						$("#desc-popup").show();
					};
				})(marker,content));
				
			} else if (data_status == "2") {
				var marker = new google.maps.Marker({
					map : map, 
					position : point, 
					icon: 'images/caution_process.png'}				
				);
				
				markers_2.push(marker);
				markers_all.push(marker);

				google.maps.event.addListener(marker, 'click', (function(marker,content) {
					return function() {
						$("#desc-popup-text").html(content);
						$("#desc-popup").show();
					};
				})(marker,content));
				
			} else if (data_status == "3") {
				var marker = new google.maps.Marker({
					map : map, 
					position : point, 
					icon: 'images/caution_process.png'
				});
					
				markers_3.push(marker);
				markers_all.push(marker);

				google.maps.event.addListener(marker, 'click', (function(marker,content) {
					return function() {
						$("#desc-popup-text").html(content);
						$("#desc-popup").show();
					};
				})(marker,content));
				
			} else if (data_status == "5") {
				var marker = new google.maps.Marker({
					map : map, 
					position : point, 
					icon: 'images/caution_test.png'
				});
				
				markers_5.push(marker);
				markers_all.push(marker);

				google.maps.event.addListener(marker, 'click', (function(marker,content) {
					return function() {
						$("#desc-popup-text").html(content);
						$("#desc-popup").show();
					};
				})(marker,content));
				
			};
		};
	});
}

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
				
				markers_obstacle.push(marker);
				
				google.maps.event.addListener(marker, 'click', (function(marker,content) {
					return function() {
						$("#desc-popup-text").html(content);
						$("#desc-popup").show();
					};
				})(marker,content));
						
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
				
				var marker = new google.maps.Marker({map : map, 
					position : point, 
					icon: 'images/accesdenied.png'});
				
				markers_obstacle.push(marker);
				
				google.maps.event.addListener(marker, 'click', (function(marker,content) {
					return function() {
						$("#desc-popup-text").html(content);
						$("#desc-popup").show();
					};
				})(marker,content));
					
				o++;
			};

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