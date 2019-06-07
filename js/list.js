var listOfEvents = eventManifest.Events;



function eventPopupTrigger(x) {
    console.log("AAA");
    for (let i in markers) {
        if (markers[i].id == x) {
            google.maps.event.trigger(markers[i], 'click');
        }
    }
}

function buildEventList() {
    function renderEvent(eventData, eid) {
        let toDisplay = (filterList.length == 2);
        for (j in eventData.foodCategories) {
            if (filterList.indexOf(eventData.foodCategories[j]) > -1) {
                toDisplay = 1;
            }
        }
        if (!toDisplay) return;
        var event = document.createElement('div');
        event.classList.add('event-container');
        event.classList.add('pad');
        event.onclick = function () {
            console.log("AAA");
            for (let i in markers) {
                if (markers[i].id == eid) {
                    google.maps.event.trigger(markers[i], 'click');
                }
            }
        };

        var title = document.createElement('h3');
        title.classList.add('event-title-list');
        title.innerHTML = eventData.title;
        event.appendChild(title);

        var location = document.createElement('h4');
        location.classList.add('event-start');
        location.innerHTML = eventData.room;
        event.appendChild(location);

        var time = document.createElement('h4');
        time.classList.add('event-start');
        var st = eventData.startTime;
        var et = eventData.endTime;
        time.innerHTML = st + " - " + et;
        event.appendChild(time);

        var categories = document.createElement('h4');
        categories.classList.add('event-categories');
        var cat = eventData.foodCategories;
        categories.innerHTML = cat;
        event.appendChild(categories);
        event.onclick = 'openEventPopup(this)';

        var description = document.createElement('p');
        description.classList.add('event-description');
        description.innerHTML = eventData.description;
        event.appendChild(description);
        table.appendChild(event);

        console.log(getMyLocation());

        var userPos = getMyLocation();
        if (userPos)
            dirURL = "https://www.google.com/maps/dir/?api=1&origin=" + userPos.lat + "%2C+" + userPos.lng + "&destination=" + eventData.lat + "%2C+" + eventData.lng + "&dir_action=navigate";
        else
            dirURL = "https://www.google.com/maps/dir/?api=1&destination=" + eventData.lat + "%2C+" + eventData.lng + "&dir_action=navigate";
        event.innerHTML += "\
        <a href='" + dirURL + "'> \
            <span class='big-button list-navigation-button'>\
                <i class='material-icons'>directions</i> \
                <span>Navigate</span> \
            </span>\
        </a>";
    }
    var table = document.createElement("div");
    table.id = 'event-list';
    table.classList.add('event-popup');
    table.innerHTML += "<i id='close-list-icon' class='material-icons float-right' onclick='closeListPopup()'>close</i>";
    if (table) {
        for (var i in listOfEvents) {
            renderEvent(listOfEvents[i], i);
        }
    }
    var storage = JSON.parse(localStorage.getItem("localManifest"));
    console.log(storage);
    if (storage) {
        for (var i in storage.Events) {
            renderEvent(storage.Events[i], i + listOfEvents.length);
        }
    }
    document.body.appendChild(table);
}