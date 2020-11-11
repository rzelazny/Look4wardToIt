var kanyeURL = "https://api.kanye.rest"

$.ajax({
    url: kanyeURL,
    method: "GET"
}).then(function(data){
    console.log("i can see kanye")
    console.log(data.quote); // generates random quote
    // $("#today").empty();
    $("#dailyQuote").text(data.quote);
})
