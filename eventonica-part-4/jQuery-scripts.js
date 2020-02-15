const eventRecommenderApp = new EventRecommender();
const APIKey = '7elxdku9GGG5k8j0Xm8KWdANDgecHMV0';

$(document).ready(() => {
  //eventRecommenderApp.allUsers();
  eventRecommenderApp.addUserByName("Peaches", "Christ", 12345);
  eventRecommenderApp.addUserByName("Marlan", "Manson", 06667);
  eventRecommenderApp.addEvent(
    "Music",
    "Country Stars",
    "The Met",
    "$199",
    "Jan 02, 2020",
    12314,
    "8:30"
  );

  eventRecommenderApp.saveUserEvent("Marlan Manson", 12314);

  displayUsers();

  displayEvents();

  $("#save-user-event").submit(function(event) {
    event.preventDefault();
    let userID = $("#save-user-id").val();
    let eventID = $("#save-event-id").val();
    eventRecommenderApp.saveUserEvent(userID, eventID);
    //console.log(eventRecommenderApp.users);
  });

$("#display-ticket-master-event").each(function(index, element ) {
    $("#ticket-master-search").submit(function(event) {
      event.preventDefault();
      let keyword = $("#ticket-master-search-id").val();
   
  $.ajax({
    type:"GET",
    url:`https://app.ticketmaster.com/discovery/v2/events?apikey=7elxdku9GGG5k8j0Xm8KWdANDgecHMV0&keyword=${keyword}`,
    async:true,
    dataType: "json",
    success: function(json) {
      let events = json._embedded.events;
      let eventCategory = events[0].classifications[0].segment.name;
      let eventName = events[0].name;
      let location = events[0]._embedded.venues[0].name;
      let ticketPrice = events[0].sales;
      let eventDate = events[0].dates.start.localDate;
      let eventID = events.id;
      let eventTime = events[0].dates.start.localTime;
      console.log(events[0]);
      
      $("#display-ticket-master-event").html(eventName);
      // Parse the response.
      eventRecommenderApp.addEvent(
        eventCategory,
        eventName,
        location,
        ticketPrice,
        eventDate,
        eventID,
        eventTime
        );
        // console.log("Inside the success: ", );
        displayEvents();
      },
    error: function(xhr, status, err) {
              // This time, we do not end up here!
            }

})
});
});
});

function displayUsers() {
  let displayedUser = "";
  console.log(eventRecommenderApp.users);
  for (let user of eventRecommenderApp.users) {
    displayedUser += `<li>${user.name}</li>`;
  }
  $("#all-users").html(displayedUser);
}

function displayEvents() {
  let displayedEvents = "";
  for (let event of eventRecommenderApp.events) {
    displayedEvents += `<li>${event.eventName} | Venue:  ${event.location} | ${event.eventDate}</li>`;
  }
  $("#all-events").html(displayedEvents);
  console.log("After events are added: ", displayedEvents);
}

// const eventRecommenderAppUsers = [];
// for (let user of eventRecommenderApp.users) {
//   eventRecommenderUsers.push(user);
// }
// const eventRecommenderAppEvents = [];
// for (let event of eventRecommenderApp.events) {
//   eventRecommenderEvents.push(event);
// }

// console.log(eventRecommenderApp.users);