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
            <h3> What food do you want? </h3>";
    var filters = availableFilters.Filters;
    console.log(filters);

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
    var newPopup = document.createElement("div");
    newPopup.setAttribute("id", "new-popup");
    newPopup.setAttribute("class", "event-popup icon pad");
    newPopup.innerHTML = "<form>\
    <i id='new-cancel-event' class='material-icons' onclick='closeNewPopup()'>close</i>\
    <h3> Create new event </h3>\
    <input type='text' class='new-wide-field' id='new-event-name'\
    placeholder='Event name'>\
    <input type='time' class='new-mid-field' id='new-event-time-start'\
    placeholder='Start'>\
    <input type='time' class='new-mid-field' id='new-event-time-end'\
    placeholder='End'>\
    <h id='warning'></h>\
    <input type='text' class='new-wide-field' id='new-event-description'\
    placeholder='Enter a description'>\
    <input type='text' class='new-wide-field' id='new-event-room'\
    placeholder='Room'>\
    <i id='new-create-event' class='material-icons' onclick='newEventCreate()'>done</i>\
    </form>\
    <h id='location-instructions'>Click on Map to set location</h>"
    document.body.append(newPopup);
  }
}

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
  filterList = JSON.stringify(currentFilters);
  filterMarkers();
}

function checkInputStatus() {
  if (!checkInputMode) return;
  var title = document.getElementById('new-event-name').value;
  var start = document.getElementById('new-event-time-start').value;
  var end = document.getElementById('new-event-time-end').value;
  var icon = 'Eggplant.png';
  var status = 1;
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
  var id = 0;
  for (var eventID in eventManifest.Events) {
    id++;
  }
  for (var eventID in storage.Events) {
    id++;
  }
  //TODO: add data validation
  var title = document.getElementById('new-event-name').value;
  var start = document.getElementById('new-event-time-start').value;
  var end = document.getElementById('new-event-time-end').value;
  var description = document.getElementById('new-event-description').value;
  var icon = 'Bagged Lunch.png';
  var room = document.getElementById('new-event-room').value;
  storage.Events[id] = {
    "title": title,
    "lat": selectLat,
    "lng": selectLng,
    "startTime": convert(start),
    "endTime": convert(end),
    "icon": icon,
    "description": description,
    "room": room,
    "comments": [],
    "foodCategories": [],
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


function convert(input) {
  return moment(input, 'HH:mm').format('h:mm A');
}