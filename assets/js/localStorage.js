    //variable for local storage/retrieval of events
    var events = [];
    var inputElement = $(".input-event");

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
                }
            }
            //display the stored event if a matching date was found
            if(dateWithEvent !== ""){
                inputElement[dateWithEvent].value = events[i].event;
                //clear out match for next loop
                dateWithEvent = "";
            }
        }
    }

//function stores text inputs locally
function addInputEvents(inputElement) {
        $("#previousMonth").on("click", loadExistingEvents);
        $("#nextMonth").on("click", loadExistingEvents);

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

    $(document).ready(loadExistingEvents)

    //load and display events when next or previous buttons are clicked
    
