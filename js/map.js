var markers = [];

var map = new google.maps.Map(document.getElementById('map'), {
  center: {lat: 42.057656, lng: -87.67428},
  zoom: 15,
  disableDefaultUI: true,
  clickableIcons: false,
  styles: [
    {
      "featureType": "poi",
      "stylers": [
        {
          "visibility": "simplified"
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "labels",
      "stylers": [
        {
          "weight": 1.5
        }
      ]
    },
    {
      "featureType": "poi.business",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "labels.text",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    }
  ]
});

for (var eventID in eventManifest.Events) {
  var event = eventManifest.Events[eventID];
  var marker = new google.maps.Marker({
      position: {lat: event.lat,
        lng: event.lng},
      map: map,
      title: event.title,
      eventID: eventID,
      icon: 'assets/' + Math.floor(Math.random()*16) + '.png',
      foodCategories:event.foodCategories
  });

  marker.addListener('click', function(e) {
    //close old popup if there is one
    closeFilterPopup();
    closeEventPopup();

    var event = eventManifest.Events[this.eventID];

    var title = event.title;
    var startTime = event.startTime;
    var endTime = event.endTime;
    var description = event.description;
    var food = event.foodCategories;
    var room = event.room;
    
    var eventPopup = document.createElement("div");
    eventPopup.setAttribute("id", "event-popup");
    eventPopup.setAttribute("class", "event-popup details-popup icon pad");
    eventPopup.innerHTML += "\
            <i class='material-icons float-right' onclick='closeEventPopup()'>close</i>\
            <h3>" + title + "</h3> \
            <h4>" + room + "</h4>\
            <h4> Time: " + startTime + " - " + endTime + "</h4> \
            <h4>" + food + "</h4> \
            <p>" + description + "</p> \
            <i class='material-icons float-right'>directions</i>";
    document.body.append(eventPopup);

  //resize map and center on the point clicked
    //account for popup on left side
    lat = event.lat;
    lng = event.lng;
    if(window.innerWidth > 799){
      if(lng > 0)
      lng = event.lng + 0.004;
      else
      lng = event.lng - 0.004;
    }
    //account for popup on bottom
    else {
      if(lat > 0)
      lat = event.lat  - 0.002;
      else
      lat = event.lat  + 0.002;
    }
    
    map.setZoom(16);
    map.panTo({lat, lng});
  });
  markers.push(marker);
};

function filterMarkers(){
  for(var i in markers){
    let toDisplay = 0;
    for(j in markers[i].foodCategories){
      if (filterList.indexOf(markers[i].foodCategories[j]) > -1){
        toDisplay = 1;
      }
    }
    console.log(markers[i].title + ": " + toDisplay);
    if (toDisplay) {
      markers[i].setMap(map);
    } else {
      markers[i].setMap(null);
    }
  }
}