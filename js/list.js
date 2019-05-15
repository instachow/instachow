var listOfEvents = EventList.Events;

function buildEventList() {
    var table = document.getElementById("album-list");
    console.log(table);
    if (table != null) {
        console.log(listOfEvents);
        for (var i in listOfEvents) {
            var event = document.createElement('div');
            event.classList.add('event-container');

            var start = document.createElement('p');
            start.classList.add('event-title');
            start.innerHTML = listOfEvents[i].title;
            event.appendChild(start);

            var start = document.createElement('p');
            start.classList.add('event-start');
            var st = listOfEvents[i].startTime;
            console.log(listOfEvents[i]);

            start.innerHTML = formatDate(st);
            event.appendChild(start);
            console.log(start, "hi");
            var end = document.createElement('p');
            end.classList.add('event-end');
            et = listOfEvents[i].endTime;
            end.innerHTML = formatDate(et);
            event.appendChild(end);

            var categories = document.createElement('p');
            categories.classList.add('event-categories');
            var cat = listOfEvents[i].foodCategories;
            var string = "";
            console.log(cat);
            for (var j in cat) {
                console.log(cat[j]);
                string += cat[j] + ", ";
            }
            categories.innerHTML = string;
            event.appendChild(categories);

            var description = document.createElement('p');
            description.classList.add('event-description');
            description.innerHTML = listOfEvents[i].description;
            event.appendChild(description);
            table.appendChild(event);
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