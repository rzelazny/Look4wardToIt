// get holidays //
var calApiKey = "712601737a8c6a737a00b16a646c175ecbbbd2df";
var holidayURL = "https://calendarific.com/api/v2/holidays?api_key=" + calApiKey + "&country=US&year=2020";

$.ajax({
    url: holidayURL,
    method: "GET",
    dataType: "JSON",
}).then(function(data){
    console.log("see me here: " + data);
})
