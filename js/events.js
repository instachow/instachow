function closeEventPopup() {
  var eventPopup = document.getElementById('event-popup');
  if (eventPopup) {
    eventPopup.remove();
  }
}

function closeNewPopup() {
  var Popup = document.getElementById('new-popup');
  if (Popup) {
    Popup.remove();
  }
}

currentFilters = [];

function openFilterPopup(){
  closeNewPopup();
  closeEventPopup();
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

function openNewPopup() {
  closeFilterPopup();
  closeEventPopup();
  var newPopup = document.createElement("div");
  newPopup.setAttribute("id", "new-popup");
  newPopup.setAttribute("class", "event-popup icon pad");
  newPopup.innerHTML = "<form>\
                <i id='new-cancel-event' class='material-icons' onclick='closeNewPopup()'>close</i>\
                <h3> Create new event </h3>\
                <input type='text' class='new-wide-field' id='new-event-name'\
                placeholder='Event name'>\
                <input type='text' class='new-wide-field' id='new-event-location'\
                placeholder='Location'>\
                <input type='text' class='new-mid-field' id='new-event-time-start'\
                placeholder='Start'>\
                <input type='text' class='new-mid-field' id='new-event-time-end'\
                placeholder='End'>\
                <i id='new-create-event' class='material-icons'>done</i>\
            </form>"
  document.body.append(newPopup);
}