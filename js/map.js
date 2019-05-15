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
    var event = eventManifest.Events[this.eventID];
    var title = event.title;
    var startTime = event.startTime;
    var endTime = event.endTime;
    var description = event.description;
    var food = event.foodCategories;
    var room = event.room;

    closeEventPopup();
    var eventPopup = document.createElement("div");
    eventPopup.setAttribute("id", "event-popup");
    eventPopup.setAttribute("class", "details-popup icon pad");
    eventPopup.innerHTML += "\
            <i class='material-icons float-right' onclick='closeEventPopup()'>close</i>\
            <h3>" + title + "</h3> \
            <h4>" + room + "</h4>\
            <h4> Time: " + startTime + " - " + endTime + "</h4> \
            <h4>" + food + "</h4> \
            <p>" + description + "</p> \
            <i class='material-icons float-right'>directions</i>";
    document.body.append(eventPopup);
  });

};