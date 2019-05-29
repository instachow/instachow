function closeEventPopup() {
  var eventPopup = document.getElementById('event-popup');
  if (eventPopup) {
    eventPopup.remove();
  }
}

function closeNewPopup() {
  newEventMode = 0;
  if (selectMarker) {
    selectMarker.setMap(null);
  }
  var Popup = document.getElementById('new-popup');
  if (Popup) {
    Popup.remove();
  }
}

currentFilters = [];

function openFilterPopup(){
  closePopups();
  var filterPopup = document.createElement("div");
  filterPopup.setAttribute("id", "filter-popup");
  filterPopup.setAttribute("class", "event-popup icon pad");
  filterPopup.innerHTML += "\
          <i class='material-icons float-right' onclick='closeFilterPopup()'>close</i>\
          <h3> Filters </h3>";
  var filters = availableFilters.Filters;
  console.log(filters);
      
  for(food in filters){
    var filterItem = document.createElement("span");
    filterItem.setAttribute("id", food);
    filterItem.setAttribute("class", "food-type");
    filterItem.setAttribute("onclick", "toggleFilter(\"" + food + "\")");
    if (currentFilters.indexOf(food) > -1) {
      filterItem.classList.add("active-filter");
    }
    filterItem.innerHTML +=  food;
    filterPopup.append(filterItem);
  }
  document.body.append(filterPopup);
}


function closeFilterPopup() {
  var filterPopup = document.getElementById('filter-popup');
  if (filterPopup) {
    filterPopup.remove();
  }
}

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

function newEventCreate() {
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
  var icon = '8.png';
  var status = 0;
  status |= (title.length < 1);
  status |= (start.length < 1) << 1;
  status |= (end.length < 1) << 2;
  status |= (icon.length < 1) << 3;
  if status: return status;
  storage.Events[id] = {
    "title": title,
    "lat": selectLat,
    "lng": selectLng,
    "startTime": start,
    "endTime": end,
    "icon": icon,
    "description": "unimplemented",
    "room": "unimplemented",
    "comments": [],
    "foodCategories": [],
  }
  localStorage.setItem("localManifest", JSON.stringify(storage));
  addMarker(storage.Events[id]);
  closePopups();
  filterMarkers();
  return 0;
}

function openNewPopup() {
  closePopups();
  newEventMode = 1;
  var newPopup = document.createElement("div");
  newPopup.setAttribute("id", "new-popup");
  newPopup.setAttribute("class", "event-popup icon pad");
  newPopup.innerHTML = "<form>\
                <i id='new-cancel-event' class='material-icons' onclick='closeNewPopup()'>close</i>\
                <h3> Create new event </h3>\
                <input type='text' class='new-wide-field' id='new-event-name'\
                placeholder='Event name'>\
                <input type='text' class='new-wide-field' id='new-event-location'\
                placeholder='Select location on map'>\
                <input type='time' class='new-mid-field' id='new-event-time-start'\
                placeholder='Start'>\
                <input type='time' class='new-mid-field' id='new-event-time-end'\
                placeholder='End'>\
                <i id='new-create-event' class='material-icons' onclick='newEventCreate()'>done</i>\
            </form>"
  document.body.append(newPopup);
}

function closePopups() {
  closeFilterPopup();
  closeEventPopup();
  closeNewPopup();
}