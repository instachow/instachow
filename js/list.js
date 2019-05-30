var listOfEvents = eventManifest.Events;

function buildEventList() {
    var table = document.createElement("div");
    table.id = 'event-list';
    table.classList.add('event-popup');
    table.innerHTML += "<i id='close-list-icon' class='material-icons float-right' onclick='closeListPopup()'>close</i>";
    if (table) {
        for (var i in listOfEvents) {
            var event = document.createElement('div');
            event.classList.add('event-container');
            event.classList.add('pad');
            var eventData = listOfEvents[i];

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
    }
    document.body.appendChild(table);
}