// get holidays //

var holidayURL = "https://calendarific.com/api/v2/holidays"

$.ajax({
    url: holidayURL,
    method: "GET",
    dataType: "JSON",
}).then(function(data){
    console.log("see me here: " + data)
})
