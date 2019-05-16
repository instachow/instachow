function closeEventPopup() {
  var eventPopup = document.getElementById('event-popup');
  if (eventPopup) {
    // document.getElementById('map').style.width = "100%";
    // document.getElementById('map').style.float = "none";
    eventPopup.remove();
  }
}