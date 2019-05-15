var map = new google.maps.Map(document.getElementById('map'), {
  center: {lat: 42.057656, lng: -87.67428},
    zoom: 15
});

for (var eventID in eventManifest.Events) {
  var marker = new google.maps.Marker({
      position: {lat: 42.057656, lng: -87.67428},
      map: map,
      title: 'Click to zoom'
  });

  marker.addListener('click', function(e) {
      displayEvent(eventID);
  });
};

function displayEvent(eventID) {
  console.log(eventID);
};
