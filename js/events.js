currentFilters = [];
var checkInputMode = false;

function openFilterPopup() {
  closePopups("filter");
  filterPopup = document.getElementById('filter-popup')
  if (filterPopup) {
    closeFilterPopup();
  } else {
    var filterPopup = document.createElement("div");
    filterPopup.setAttribute("id", "filter-popup");
    filterPopup.setAttribute("class", "event-popup icon pad");
    filterPopup.innerHTML += "\
            <i class='material-icons float-right' onclick='closeFilterPopup()'>close</i>\
            <h3> Food type: </h3>";
    var filters = availableFilters.Filters;

    for (food in filters) {
      var filterItem = document.createElement("span");
      filterItem.setAttribute("id", food);
      filterItem.setAttribute("class", "food-type");
      filterItem.setAttribute("onclick", "toggleFilter(\"" + food + "\")");
      if (currentFilters.indexOf(food) > -1) {
        filterItem.classList.add("active-filter");
      }
      filterItem.innerHTML += food;
      filterPopup.append(filterItem);
    }
    var filterTime = document.createElement("input");
    filterTime.setAttribute('id', 'filter-time-end');
    filterTime.setAttribute('onkeyup', 'filterMarkers()');
    filterTime.setAttribute('oninput', 'filterMarkers()');
    filterTime.setAttribute('type', 'time');
    if (lastTime) filterTime.value = lastTime;
    var filterTimeD = document.createElement("h3");
    filterTimeD.innerHTML = "What time do you want to go?";
    filterPopup.append(filterTimeD);
    filterPopup.append(filterTime);
    document.body.append(filterPopup);
  }
}

function openListPopup() {
  closePopups("list");
  listPopup = document.getElementById('event-list')
  if (listPopup) {
    closeListPopup();
  } else {
    buildEventList();
    document.getElementById('event-list').style.display = "inherit";
  }
}

function openNewPopup() {
  closePopups("new");
  newPopup = document.getElementById('new-popup')
  if (newPopup) {
    closeNewPopup();
  } else {
    newEventMode = 1;
    var date = new Date();
    var currentTime = date.toTimeString().substring(0,5);
    var newPopup = document.createElement("div");
    newPopup.setAttribute("id", "new-popup");
    newPopup.setAttribute("class", "event-popup icon pad");
    newPopup.innerHTML = "<form>\
    <i id='new-cancel-event' class='material-icons' onclick='closeNewPopup()'>close</i>\
    <h3> Create new event </h3>\
    <p> Event Name </p> \
    <input type='text' class='new-wide-field' id='new-event-name'\
    placeholder='The Last Supper'> \
    <span style='min-width:50%; margin-top:10px;'>\
      <p style='display:inline;'> Start Time </p> \
      <input type='time' class='new-mid-field' id='new-event-time-start' value=" + currentTime + ">\
    </span>\
    <span>\
      <p style='display:inline;'> End Time </p> \
      <input type='time' class='new-mid-field' id='new-event-time-end'>\
    </span>\
    <h id='warning'></h>\
    <p> Event Description </p> \
    <input type='text' class='new-wide-field' id='new-event-description'\
    placeholder='We&#39;ll have a sick cornucopia and artists in attendance!'>\
    <select name='icon' id='new-event-icon'>\
    <option selected hidden>Choose an icon</option>\
    <option value='Avocado'>Avocado</option>\
    <option value='Bagged Lunch'>Bagged Lunch</option>\
    <option value='BBQ'>BBQ</option>\
    <option value='Burrito'>Burrito</option>\
    <option value='Cherry'>Cherry</option>\
    <option value='Chicken'>Chicken</option>\
    <option value='Chilli'>Chilli</option>\
    <option value='Corn'>Corn</option>\
    <option value='Crossiant'>Crossiant</option>\
    <option value='Donut'>Donut</option>\
    <option value='Eggplant'>Eggplant</option>\
    <option value='Orange'>Orange</option>\
    <option value='Pizza'>Pizza</option>\
    <option value='Sausage'>Sausage</option>\
    <option value='Steak'>Steak</option>\
    <option value='Watermelon'>Watermelon</option>\
    </select>\
    <select name='filters[]' multiple='multiple' size='5' id='select-meal-type'>\
    <option value=' Fish'>Fish</option>\
    <option value=' Crustaceans'>Crustaceans</option>\
    <option value=' Smoothies'>Smoothies</option>\
    <option value=' Cupcakes'>Cupcakes</option>\
    <option value=' Fast food'>Fast food</option>\
    <option value=' Burgers'>Burgers</option>\
    <option value=' Pizza'>Pizza</option>\
    <option value=' Asian'>Asian</option>\
    </select>\
    <input type='text' class='new-wide-field' id='new-event-room'\
    placeholder='Room'>\
    <i id='new-create-event' class='material-icons' onclick='newEventCreate()'>done</i>\
    </form>\
    <h id='location-instructions'>Click on Map to set location</h>"
    document.body.append(newPopup);
  }
}

function openEventPopup(e) {
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
};

// START OF FUNCTIONS TO CLOSE POPUPS
function closeFilterPopup() {
  if (filterPopup = document.getElementById('filter-popup')) {
    filterPopup.remove();
  }
}

function closeListPopup() {
  if (listPopup = document.getElementById('event-list'))
    listPopup.remove();
}

function closeEventPopup() {
  if (eventPopup = document.getElementById('event-popup')) {
    eventPopup.remove();
    zoomDefault();
  }
}

function closeNewPopup() {
  newEventMode = 0;
  if (selectMarker) {
    selectMarker.setMap(null);
  }
  if (Popup = document.getElementById('new-popup')) {
    Popup.remove();
  }
}

function closePopups(excludeMe) {
  if (excludeMe != "filter")
    closeFilterPopup();
  if (excludeMe != "event")
    closeEventPopup();
  if (excludeMe != "new")
    closeNewPopup();
  if (excludeMe != "list")
    closeListPopup();
}
// END OF FUNCTIONS TO CLOSE POPUPS


function toggleFilter(food) {
  var i = currentFilters.indexOf(food);
  if (i > -1) {
    currentFilters.splice(i, 1);
  } else {
    currentFilters.push(food);
  }
  var filterToToggle = document.getElementById(food);
  if (filterToToggle) {
    filterToToggle.classList.toggle("active-filter");
  }
  let filterLabel = document.getElementById('filter-label');
  if (currentFilters.length > 0)
    filterLabel.innerHTML = "Filters (" + currentFilters.length + ")";
  else
    filterLabel.innerHTML = "Filter";
  filterList = JSON.stringify(currentFilters);
  filterMarkers();
}

function checkInputStatus() {
  if (!checkInputMode) return;
  var title = document.getElementById('new-event-name').value;
  var start = document.getElementById('new-event-time-start').value;
  var end = document.getElementById('new-event-time-end').value;
  var icon = document.getElementById('new-event-icon').value + ".png";
  console.log(icon);


  var status = 1;

  if (icon == "Choose an icon.png") {
    document.getElementById('new-event-icon').style.borderColor = 'red';
    status &= 0;
  } else {
    document.getElementById('new-event-icon').style.borderColor = 'lightgrey';
  }
  if (title.length < 1) {
    document.getElementById('new-event-name').style.borderColor = 'red';
    status &= 0;
  } else {
    document.getElementById('new-event-name').style.borderColor = 'lightgrey';
  }

  if (start.length < 1) {
    document.getElementById('new-event-time-start').style.borderColor = 'red';
    status &= 0;
  } else {
    document.getElementById('new-event-time-start').style.borderColor = 'lightgrey';
  }
  if (end.length < 1) {
    document.getElementById('new-event-time-end').style.borderColor = 'red';
    status &= 0;
  } else {
    document.getElementById('new-event-time-end').style.borderColor = 'lightgrey';
  }
  if (end <= start) {
    document.getElementById('new-event-time-start').style.borderColor = 'red';
    document.getElementById('new-event-time-end').style.borderColor = 'red';
    status &= 0;
  } else {
    document.getElementById('new-event-time-start').style.borderColor = 'lightgrey';
    document.getElementById('new-event-time-end').style.borderColor = 'lightgrey';
  }
  if (!selectLat || !selectLng) {
    document.getElementById('location-instructions').style.color = 'red';
    document.getElementById('location-instructions').style.fontWeight = '900';
    status &= 0;
    document.getElementById('warning').innerHTML = 'End cannot be earlier than start';
    document.getElementById('warning').style.color = 'red';
    document.getElementById('warning').style.fontWeight = '900';
    //indicate that the location was not selected correctly
  } else {
    document.getElementById('location-instructions').style.color = 'black';
    document.getElementById('location-instructions').style.fontWeight = 'normal';
    document.getElementById('warning').innerHTML = '';
  }
  return status;
}

function newEventCreate() {
  checkInputMode = true;
  if (!checkInputStatus()) return;
  var storage = JSON.parse(localStorage.getItem("localManifest"));
  if (!storage) storage = JSON.parse("{\"Events\":{}}");
  id = 0;
  for (var eventID in eventManifest.Events) {
    id++;
  }
  for (var eventID in storage.Events) {
    id++;
  }
  console.log("originalId: " + id);
  //TODO: add data validation
  var title = document.getElementById('new-event-name').value;
  var start = document.getElementById('new-event-time-start').value;
  var end = document.getElementById('new-event-time-end').value;
  var description = document.getElementById('new-event-description').value;
  var icon = document.getElementById('new-event-icon').value + ".png";
  var room = document.getElementById('new-event-room').value;
  const selected = document.querySelectorAll('#select-meal-type option:checked');
  const filters = Array.from(selected).map(el => el.value);
  storage.Events[id] = {
    "title": title,
    "lat": selectLat,
    "lng": selectLng,
    "startTime": convert24to12(start),
    "endTime": convert24to12(end),
    "icon": icon,
    "description": description,
    "room": room,
    "comments": [],
    "foodCategories": filters,
  }
  localStorage.setItem("localManifest", JSON.stringify(storage));
  addMarker(storage.Events[id]);
  closePopups("all");
  filterMarkers();
  //reset selection variables
  selectMarker = null;
  selectLat = null;
  selectLng = null;
}


function convert24to12(input) {
  return moment(input, 'HH:mm').format('h:mm A');
}

function convert12toRaw(input) {
  return parseInt(moment(input, "h:mm A").format('HHMM'));
}