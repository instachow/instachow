var listOfEvents = eventManifest.Events;

function buildEventList() {
    function renderEvent(eventData) {
        let toDisplay = (filterList.length == 2);
        for(j in eventData.foodCategories){
            if (filterList.indexOf(eventData.foodCategories[j]) > -1){
                toDisplay = 1;
            }
        }
        if (!toDisplay) return; 
        var event = document.createElement('div');
        event.classList.add('event-container');
        event.classList.add('pad');

        var title = document.createElement('h3');
        title.classList.add('event-title-list');
        title.innerHTML = eventData.title;
        event.appendChild(title);

        var time = document.createElement('h4');
        time.classList.add('event-start');
        var st = eventData.startTime;
        var et = eventData.endTime;
        time.innerHTML = "Time: " + st + " - " + et;
        event.appendChild(time);

        var categories = document.createElement('h4');
        categories.classList.add('event-categories');
        var cat = eventData.foodCategories;
        categories.innerHTML = cat;
        event.appendChild(categories);

        var description = document.createElement('p');
        description.classList.add('event-description');
        description.innerHTML = eventData.description;
        event.appendChild(description);
        table.appendChild(event);
        table.appendChild(document.createElement('hr'));
    }
    var table = document.createElement("div");
    table.id = 'event-list';
    table.classList.add('event-popup');
    table.innerHTML += "<i id='close-list-icon' class='material-icons float-right' onclick='closeListPopup()'>close</i>";
    if (table) {
        for (var i in listOfEvents) {
            renderEvent(listOfEvents[i]);
        }
    }
    var storage = JSON.parse(localStorage.getItem("localManifest"));
    console.log(storage);
    if (storage) {
        for (var i in storage.Events) {
            renderEvent(storage.Events[i]);
        }
    }
    document.body.appendChild(table);
}