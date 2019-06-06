 var markers = [];
 var newEventMode = 0;
 var selectMarker = null;
 var selectLat = null;
 var selectLng = null;

 var filterList = "[]"; //must be initialized in this way

 var map = new google.maps.Map(document.getElementById('map'), {
   center: {
     lat: 42.057656,
     lng: -87.67428
   },
   zoom: 15,
   disableDefaultUI: true,
   clickableIcons: false,
   styles: [{
       "featureType": "poi",
       "stylers": [{
         "visibility": "simplified"
       }]
     },
     {
       "featureType": "poi",
       "elementType": "labels",
       "stylers": [{
         "weight": 1.5
       }]
     },
     {
       "featureType": "poi.business",
       "stylers": [{
         "visibility": "off"
       }]
     },
     {
       "featureType": "poi.park",
       "elementType": "labels.text",
       "stylers": [{
         "visibility": "off"
       }]
     }
   ]
 });

 map.addListener('click', function (e) {
   if (newEventMode) {
     selectLat = e.latLng.lat();
     selectLng = e.latLng.lng();
     if (!selectMarker) {
       selectMarker = new google.maps.Marker({
         position: {
           lat: selectLat,
           lng: selectLng
         },
         map: map,
         icon: 'assets/black-pin.png',
       });
     } else {
       selectMarker.setPosition(new google.maps.LatLng(selectLat, selectLng));
       selectMarker.setMap(map);
     }
   }
 })

 var marker;
 var userPos;

 function findMyLocation() {
   if (navigator.geolocation) {
     navigator.geolocation.getCurrentPosition(function (position) {
       pos = {
         lat: position.coords.latitude,
         lng: position.coords.longitude
       };
       userPos = pos;
       marker = new google.maps.Marker({
         position: {
           lat: pos.lat,
           lng: pos.lng
         },
         map: map,
         title: 'Current location',
         eventID: -1,
         icon: 'assets/location2.png',
       })
     })
   }
 }

 function showMyLocation() {
   if (marker) {
     map.setZoom(16);
     map.panTo(marker.position);
   }
 }

 function getMyLocation() {
   if (userPos)
     return userPos;
   else
     return false;
 }

 function ReCenter() {
   map.setZoom(15);
   map.panTo({
     lat: 42.057656,
     lng: -87.67428,
   });
 }
 findMyLocation();
 showMyLocation();


 function addMarker(event) {
   var marker = new google.maps.Marker({
     position: {
       lat: event.lat,
       lng: event.lng
     },
     map: map,
     title: event.title,
     //eventID: eventID,
     icon: 'assets/' + event.icon,
     foodCategories: event.foodCategories
   });

   marker.addListener('click', function (e) {
     //close old popup if there is one
     closePopups();

     var title = event.title;
     var startTime = event.startTime;
     var endTime = event.endTime;
     var description = event.description;
     var food = event.foodCategories;
     var room = event.room;

     var eventPopup = document.createElement("div");
     eventPopup.setAttribute("id", "event-popup");
     eventPopup.setAttribute("class", "event-popup details-popup icon pad");
     console.log(event.lat);
     console.log(userPos);
     if (userPos)
       dirURL = "https://www.google.com/maps/dir/?api=1&origin=" + userPos.lat + "%2C+" + userPos.lng + "&destination=" + event.lat + "%2C+" + event.lng + "&dir_action=navigate";
     else
       dirURL = "https://www.google.com/maps/dir/?api=1&destination=" + event.lat + "%2C+" + event.lng + "&dir_action=navigate";
     eventPopup.innerHTML += "\
            <div class='tooltip'> \
              <i class='material-icons float-right' onclick='closeEventPopup()'>close</i>\
              <span class='tooltiptext tooltip-left'>Close</span> \
            </div> \
            <h3>" + title + "</h3> \
            <p>" + room + "</p>\
            <p>" + startTime + " - " + endTime + "</p> \
            <p>" + food + "</p> \
            <p>" + description + "</p> \
            <a href='" + dirURL + "'> \
              <span class='big-button'>\
                <i class='material-icons'>directions</i> \
                <span>Navigate</span> \
              </span>\
            </a>";
     document.body.append(eventPopup);

     //resize map and center on the point clicked
     //account for popup on left side
     lat = event.lat;
     lng = event.lng;
     if (window.innerWidth > 799) {
       if (lng > 0)
         lng = event.lng + 0.004;
       else
         lng = event.lng - 0.004;
     }
     //account for popup on bottom
     else {
       if (lat > 0)
         lat = event.lat - 0.002;
       else
         lat = event.lat + 0.002;
     }

     map.setZoom(16);
     map.panTo({
       lat,
       lng
     });
   });
   markers.push(marker);
 }

 function filterMarkers() {
   for (var i in markers) {
     let toDisplay = (filterList.length == 2);
     for (j in markers[i].foodCategories) {
       if (filterList.indexOf(markers[i].foodCategories[j]) > -1) {
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

 function hidemarkers() {
   for (var i in markers) {
     markers[i].setMap(null);
   }
 }

 function indexMain() {
   //add every event in the static data
   for (var eventID in eventManifest.Events) {
     var event = eventManifest.Events[eventID];
     addMarker(event);
   };

   //add every event in the user date
   var storage = JSON.parse(localStorage.getItem("localManifest"));
   if (!storage) storage = JSON.parse("{\"Events\":{}}");
   for (var eventID in storage.Events) {
     var event = storage.Events[eventID];
     addMarker(event);
   };
 }

 indexMain();