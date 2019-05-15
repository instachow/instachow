var listOfEvents = require("data.json");

function buildEventList() {
    var table = document.getElementById("album-list");
    if (table != null) {
        for (var i = 0; i < listOfEvents.length; i++) {
            var event = document.createElement('div');
            event.classList.add('event-container');

            var start = document.createElement('p');
            start.classList.add('event-start');
            start.innerHTML = listOfEvents[i].startTime;

            var end = document.createElement('p');
            end.classList.add('event-end');
            end.innerHTML = listOfEvents[i].endTime;

            var title = document.createElement('p');
            title.classList.add('event-title');
            title.innerHTML = listOfEvents[i].title;

            var title = document.createElement('p');
            title.classList.add('event-title');
            title.innerHTML = listOfEvents[i].title;

            var title = document.createElement('p');
            title.classList.add('event-title');
            title.innerHTML = listOfEvents[i].title;

            var title = document.createElement('p');
            title.classList.add('event-title');
            title.innerHTML = listOfEvents[i].title;

            var title = document.createElement('p');
            title.classList.add('event-title');
            title.innerHTML = listOfEvents[i].title;
        }
    }
}