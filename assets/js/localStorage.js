//variable for local storage/retrieval of events
var events = [];
var inputElement = [];
var userPreferences = {
    userName: "",
    userEmail: "",
    theme: "",
    quote: "",
    sports: {
        likeSports: false,
        favSports: [],
        favTeam: ""
    },
    movies: {
        likesMovies: false,
        favGenres: [],
        favMovie: ""
    }
}

//load stored user preferences
function loadUserPreferences(){
    // Parsing the JSON string to an object
    var storedPreferences = JSON.parse(localStorage.getItem("preferences"));
    // If preferences were retrieved from localStorage, update the preferences object
    if (storedPreferences !== null) {
        userPreferences = storedPreferences;
    }
    else{
        //if there are no stored preferences display the user selection section first
        $("#settings-view-container").css("display", "block");
    }
}

//load saved events from local storage if there are any
function loadExistingEvents() {
    inputElement = $(".input-event");

    // Parsing the JSON string to an object
    var storedEvents = JSON.parse(localStorage.getItem("events"));
    // If events were retrieved from localStorage, update the event array to it
    if (storedEvents !== null) {
        events = storedEvents;
        //display the stored events
        displayStoredEvents(inputElement);
    }
    //events are loaded after a screen update, so make sure the new elements can still take input
    addInputEvents(inputElement);
}

//function displays stored events
function displayStoredEvents(inputElement){
    var dateWithEvent = "";
    //for every stored event...
    for (i=0; i < events.length; i++){
        //find the input element with the date equal to the stored event
        for (j=0; j < inputElement.length; j++){
            if(inputElement[j].attributes.date.value === events[i].eventDay){
                dateWithEvent = j;
                //display the stored event if a matching date was found
                if(dateWithEvent !== ""){
                    inputElement[dateWithEvent].value = events[i].event;
                    //clear out match for next loop
                    dateWithEvent = "";
                }
            }
        }
        
    }
}

//function puts events into local storage
function storeInput (source, myElement, sysEvent, sysDate) {

    //sysEvent and sysDate are optional parameters
    sysEvent = sysEvent || 0;
    sysDate = sysDate || 0;

    if (source === "user"){
        var newEvent = {
            event: myElement.value,
            eventDay: myElement.attributes.date.value,
            reminderSent: false
        }
    }
    else if (source === "system"){
        var newEvent = {
            event: sysEvent,
            eventDay: sysDate,
            reminderSent: false
        }
    }
     //see if day already has an event saved
    var eventExists = findAttribute(events, "eventDay", newEvent.eventDay)

    //if there is a stored event and the new event is blank, remove the existing event from storage
    if(eventExists !== -1 && newEvent.event === ""){
        events.splice(eventExists, 1);
        localStorage.setItem("events", JSON.stringify(events));
    }
    
    //no need to store blank events unless they're deleting one that already exists
    if(newEvent.event !== ""){
            
        if (eventExists === -1){
             //if there isn't an event for the current timeblock, add it to the end
            events.push(newEvent);
        }
        else{
            //if there is already an event, user can overwrite the existing event
            if (source === "user"){
                events.splice(eventExists, 1, newEvent);
            }
            //if there is already an event, system events get concat'd rather than overwriting 
            else{
                newEvent.event = events[eventExists].event + "\r\n"+ newEvent.event;
                events.splice(eventExists, 1, newEvent);
            }
            
        }

        //store the updated event array
        localStorage.setItem("events", JSON.stringify(events));
    }
}

//function makes sure all input elements can store text locally
function addInputEvents(inputElement) {
    
    //function stores text inputs locally
    inputElement.on('input', function(){
        storeInput("user", this);
    })
}


//function to find an attribute with a given value
function findAttribute(array, attr, value) {
    for(var i = 0; i < array.length; i++) {
        if(array[i][attr] === value) {
            return i;
        }
    }
    return -1;
}

$(document).ready(function(){

    //load and display events when view changes
    $("#previousMonth, #nextMonth").on("click", loadExistingEvents);
    $("#month-button, #daily-button").on("click", loadExistingEvents);
    $("#previousDate, #nextDate").on("click", loadExistingEvents);
    $("#month, #year").on("click", loadExistingEvents);

    //load and display events the first time the page is loaded
    loadUserPreferences();
    loadExistingEvents();

    //add save events for user preference section
    $("#save-user-button").on("click", (function(){
        userPreferences.userName = $("#nameInput").val();
        $("#nameInput").val("");
        userPreferences.userEmail = $("#emailInput").val();
        $("#emailInput").val("");
        localStorage.setItem("preferences", JSON.stringify(userPreferences));
    }));

    //save favorite sports team
    $("#save-sports-button").on("click", (function(){
        userPreferences.sports.favTeam = $("#faveTeamInput").val();
        $("#faveTeamInput").val("")
        localStorage.setItem("preferences", JSON.stringify(userPreferences));
    }));

    //save favorite movie choice
    $("#save-movies-button").on("click", (function(){
        userPreferences.movies.favMovie = $("#faveMovieInput").val();
        $("#faveMovieInput").val("")
        localStorage.setItem("preferences", JSON.stringify(userPreferences));
    }));

    //toggles checkmark and radio button data in local storage
    $(".form-check-input").change(function (){
        switch(this.name){
            case "optionRadio": //handles radio toggle buttons
                switch(($(this).closest(".form-group").attr("id"))){
                    case "themeOptions" :
                        userPreferences.theme = $(this).val();
                    break;
                    case "quoteOptions":
                        userPreferences.quote = $(this).val();
                    break;
                    case "sportsYN":
                        userPreferences.sports.likeSports = $(this).val();
                    break;
                    case "moviesYN":
                        userPreferences.movies.likesMovies = $(this).val();
                    break;
                }
                break;
            case "sportType": //handles sports category checkboxes
                //if the data exists already delete it
                if(userPreferences.sports.favSports.includes(this.value)){
                    userPreferences.sports.favSports.splice(userPreferences.sports.favSports.indexOf(this.value), 1)
                }
                else{ //otherwise add it
                    userPreferences.sports.favSports.push(this.value);
                }
                break;
            case "genreType": //handles movie genre checkboxes
                //if the data exists already delete it
                if(userPreferences.movies.favGenres.includes(this.value)){
                    userPreferences.movies.favGenres.splice(userPreferences.movies.favGenres.indexOf(this.value), 1)
                }
                else{ //otherwise add it
                    userPreferences.movies.favGenres.push(this.value);
                }
            break;
        }
        localStorage.setItem("preferences", JSON.stringify(userPreferences));
    })

    
})
