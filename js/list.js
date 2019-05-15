var listOfEvents = eventManifest.Events;

function buildEventList() {
    var table = document.getElementById("event-list");
    console.log(table);
    if (table != null) {
        console.log(listOfEvents);
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
            time.innerHTML = "Time: " + formatDate(st) + " - " + formatDate(et);
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
}


function formatDate(date) {
    var d = new Date(date);
    var hh = d.getHours();
    var m = d.getMinutes();
    var s = d.getSeconds();
    var dd = "AM";
    var h = hh;
    if (h >= 12) {
        h = hh - 12;
        dd = "PM";
    }
    if (h == 0) {
        h = 12;
    }
    m = m < 10 ? "0" + m : m;

    s = s < 10 ? "0" + s : s;

    /* if you want 2 digit hours:
    h = h<10?"0"+h:h; */

    var pattern = new RegExp("0?" + hh + ":" + m + ":" + s);

    var replacement = h + ":" + m;
    /* if you want to add seconds
    replacement += ":"+s;  */
    replacement += " " + dd;

    return date.replace(pattern, replacement);
}