var kanyeURL = "https://api.kanye.rest"

$.ajax({
    url: kanyeURL,
    method: "GET"
}).then(function(data){
    console.log("i can see kanye")
    //this is where i will create the attachment to
    // $("dailyQuote").text(qod);
})
