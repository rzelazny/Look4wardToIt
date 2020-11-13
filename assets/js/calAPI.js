// get holidays //
var calApiKey = "712601737a8c6a737a00b16a646c175ecbbbd2df";
var holidayURL = "https://calendarific.com/api/v2/holidays?api_key=" + calApiKey + "&country=US&year=2020";

$.ajax({
    url: holidayURL,
    method: "GET",
    dataType: "JSON",
}).then(function(data){
    for (var i = 0; i < data.response.holidays.length; i++) {
        var holidayName = data.response.holidays[i].name;
        var holidayDom= data.response.holidays[i].date.datetime.day;
        var holidayM = data.response.holidays[i].date.datetime.month;
        var holidayY = data.response.holidays[i].date.datetime.year;
        var holidayDate = holidayDom + "-" + holidayM + "-" + holidayY;
        // console.log("Name: " + holidayName + " Date: " + holidayDate);
        i++;
    }
})
