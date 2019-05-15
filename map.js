//document.addEventListener("DOMContentLoaded", function(){
    var map = new google.maps.Map(document.getElementById('map'), {
  	center: {lat: 42.057656, lng: -87.67428},
  	zoom: 15
	});

	var marker = new google.maps.Marker({
          position: {lat: 42.057656, lng: -87.67428},
          map: map,
          title: 'Click to zoom'
        });

	map.addListener('click', function(e) {
    	marker.setPosition(e.latLng);
  	});



//});
