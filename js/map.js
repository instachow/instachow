var map = new google.maps.Map(document.getElementById('map'), {
  center: {lat: 42.057656, lng: -87.67428},
  zoom: 15,
  disableDefaultUI: true

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
    var title = eventManifest.Events[this.eventID].title;
    var startTime = eventManifest.Events[this.eventID].startTime;
    var endTime = eventManifest.Events[this.eventID].endTime;
    var description = eventManifest.Events[this.eventID].description;

    closeEventPopup();
    var eventPopup = document.createElement("div");
    eventPopup.setAttribute("id", "event-popup");
    eventPopup.setAttribute("class", "details-popup icon pad");
    eventPopup.innerHTML += "\
            <i class='material-icons float-right' onclick='closeEventPopup()'>close</i>\
            <h3>" + title + "</h3> \
            <h4>ROOM</h4>\
            <h4> Time: " + startTime + " - " + endTime + "</h4> \
            <h4>Salad, Pizza, Middle-Eastern </h4> \
            <p>" + description + "</p>";
    document.body.append(eventPopup);
  });

};