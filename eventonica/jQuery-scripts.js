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
    12314,
    "Jan 02, 2020"
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

$("#all-events").each(function(index, element ) {
$.ajax({
  type:"GET",
  url:"https://app.ticketmaster.com/discovery/v2/events?apikey=7elxdku9GGG5k8j0Xm8KWdANDgecHMV0&locale=*",
  async:true,
  dataType: "json",
  success: function(json) {
              console.log(json);
              // Parse the response.
              // Do other things.
           },
  error: function(xhr, status, err) {
              // This time, we do not end up here!
           }
})
});




  // //API attempt
  // function searchKeyword() {
  //   $("#ticket-master").onclick(function() {
  //     $.ajax({
  //       type: "GET",
  //       url:
  //         "https://app.ticketmaster.com/discovery/v2/events.json?size=1&apikey={apikey}",
  //       async: true,
  //       dataType: "json",
  //       success: function(json) {
  //         console.log(json);
  //         // Parse the response.
  //         // Do other things.
  //       },
  //       error: function(xhr, status, err) {
  //         // This time, we do not end up here!
  //       }
  //     });
  //     $("#ticket-master-search-id").val();
  //   });
  // }
  // searchKeyword();
});

function displayUsers() {
  let displayedUser = "";
  console.log(eventRecommenderApp.users);
  for (let user of eventRecommenderApp.users) {
    displayedUser += `<li>${user.name}</li>`;
  }
  console.log(displayedUser);
  $("#all-users").html(displayedUser);
}

function displayEvents() {
  let displayedEvents = "";

  for (let event of eventRecommenderApp.events) {
    displayedEvents += `<li>${event.eventName} | ${event.location}</li>`;
  }

  $("#all-events").html(displayedEvents);
}

const eventRecommenderAppUsers = [];
for (let user of eventRecommenderApp.users) {
  eventRecommenderUsers.push(user);
}
const eventRecommenderAppEvents = [];
for (let event of eventRecommenderApp.events) {
  eventRecommenderEvents.push(event);
}

console.log(eventRecommenderApp.users);
