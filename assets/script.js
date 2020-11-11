$(document).ready(function(){

    //sample code to pull upcoming events for a given sports team
    // var userTeam = "Buffalo Bills";
    // var teamID = ""


    // $.ajax({
    //     type:"GET",
    //     url: "https://www.thesportsdb.com/api/v1/json/1/searchteams.php?t=" + userTeam,    
    // }).then(function(data){
    //     teamID= data.teams[0].idTeam
    //     console.log(data.teams[0].idTeam);
    //     $.ajax({
    //         type:"GET",
    //         url: "https://www.thesportsdb.com/api/v1/json/1/eventsnext.php?id=" + teamID,
    //     }).then(function(teamData){
    //         console.log(teamData);
    //     })
    // })

    //variable for local storage/retrieval of events
    var events = [];

    var inputElement =  $(".input-event")

    //load saved events from local storage if there are any
    function init() {
        // Parsing the JSON string to an object
        var storedEvents = JSON.parse(localStorage.getItem("events"));

        // If events were retrieved from localStorage, update the event array to it
        if (storedEvents !== null) {
            events = storedEvents;

            //display the stored events
            displayStoredEvents();
        }
    }

    //function displays stored events
    function displayStoredEvents(){
        var dateWithEvent = "";

        //for every stored event...
        for (i=0; i < events.length; i++){
            //find the input element with the date equal to the stored event
            for (j=0; j < inputElement.length; j++){
                if(inputElement[j].attributes.date.value === events[i].eventDay){
                    dateWithEvent = j;
                }
            }
            //display the stored event
            inputElement[dateWithEvent].value = events[i].event;
        }
    }

    //function stores text inputs locally
    inputElement.on('input', function(){

        var newEvent = {
            event: this.value,
            eventDay: this.attributes.date.value
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
                //if there is already an event, overwrite the existing event
                events.splice(eventExists, 1, newEvent);
            }

            //store the updated event array
            localStorage.setItem("events", JSON.stringify(events));
        }
    })

    //function to find an attribute with a given value
    function findAttribute(array, attr, value) {
        for(var i = 0; i < array.length; i++) {
            if(array[i][attr] === value) {
                return i;
            }
        }
        return -1;
    }

    //always run init to check for stored events
    init()
})