function closeEventPopup() {
  var eventPopup = document.getElementById('event-popup');
  if (eventPopup) {
    eventPopup.remove();
  }
}

var filterPopup = document.createElement("div");
filterPopup.setAttribute("id", "filter-popup");
filterPopup.setAttribute("class", "event-popup icon pad");
filterPopup.innerHTML += "\
        <i class='material-icons float-right' onclick='closeFilterPopup()'>close</i>\
        <h3> Filters </h3>";
var filters = availableFilters.Filters;
console.log(filters);
    
for(food in filters){
  filterPopup.innerHTML += '<h4>' + food + '</h4>';
}
document.body.append(filterPopup);

function closeFilterPopup() {
  var filterPopup = document.getElementById('filter-popup');
  if (filterPopup) {
    filterPopup.remove();
  }
}