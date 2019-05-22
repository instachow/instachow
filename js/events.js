function closeEventPopup() {
  var eventPopup = document.getElementById('event-popup');
  if (eventPopup) {
    eventPopup.remove();
  }
}

currentFilters = [];

function openFilterPopup(){
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
    var filterItem = document.createElement("h4");
    filterItem.setAttribute("id", food);
    filterItem.setAttribute("class", "food-type");
    filterItem.setAttribute("onclick", "toggleFilter(\"" + food + "\")");
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
  if(currentFilters.includes(food))
    currentFilters.pop(food);
  else
    currentFilters.push(food);
  var filterToToggle = document.getElementById(food);
  if (filterToToggle) {
    filterToToggle.classList.toggle("active-filter");
  }
  filterList = JSON.stringify(currentFilters);
  filterMarkers();
}

