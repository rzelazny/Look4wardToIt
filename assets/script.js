$(document).ready(function(){


    var userTeam = "Buffalo Bills";
    var teamID = ""


    $.ajax({
        type:"GET",
        url: "https://www.thesportsdb.com/api/v1/json/1/searchteams.php?t=" + userTeam,    
    }).then(function(data){
        teamID= data.teams[0].idTeam
        console.log(data.teams[0].idTeam);
        $.ajax({
            type:"GET",
            url: "https://www.thesportsdb.com/api/v1/json/1/eventsnext.php?id=" + teamID,
        }).then(function(teamData){
            console.log(teamData);
        })
    })

    //local storage
    var events = [];


    //load saved events from local storage if there are any
    function init() {
        // Parsing the JSON string to an object
        var storedEvents = JSON.parse(localStorage.getItem("events"));
        var dateWithEvent = ""

        // If events were retrieved from localStorage, update the event array to it
        if (storedEvents !== null) {
            events = storedEvents;

            //display the stored events
            for (i=0; i < events.length; i++){
                //storedEvents[i].eventDay
                dateWithEvent = i;
                inputEvents[dateWithEvent].value = storedEvents[i].event;
                //timeBlocks[storedEvents[i].timeblock].innerHTML = storedEvents[i].event;
            }
        }
    }

    var inputEvents =  $(".input-event")

    inputEvents.on('input', function(){

        var newEvent = {
            event: this.value,
            eventDay: this.attributes.date.value
        }

        //see if timeblock already has an event saved
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