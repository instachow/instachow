var map = new google.maps.Map(document.getElementById('map'), {
  center: {lat: 42.057656, lng: -87.67428},
    zoom: 15
});

for (var eventID in eventManifest.Events) {
  var marker = new google.maps.Marker({
      position: {lat: eventManifest.Events[eventID].lat,
        lng: eventManifest.Events[eventID].lng},
      map: map,
      title: 'Click to zoom',
      eventID: eventID
  });

  marker.addListener('click', function(e) {
    var title = document.getElementById("event-popup-title");
    var startTime = document.getElementById("event-popup-start-time");
    var endTime = document.getElementById("event-popup-end-time");
    var description = document.getElementById("event-popup-description");

    title.innerHTML = eventManifest.Events[this.eventID].title;
    startTime.innerHTML = "Start time: " + eventManifest.Events[this.eventID].startTime;
    endTime.innerHTML = "End time: " + eventManifest.Events[this.eventID].endTime;
    description.innerHTML = eventManifest.Events[this.eventID].description;
    //event-popup-(json-name)
  });

};