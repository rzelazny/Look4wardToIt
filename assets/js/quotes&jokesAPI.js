// Kanye Quote //

var kanyeRadio = document.querySelector("#kanyeQuote");

function displayKanye() {
    var kanyeURL = "https://api.kanye.rest"

    $.ajax({
        url: kanyeURL,
        method: "GET"
    }).then(function(data){
        console.log("i see kanye");
        $("#dailyQuote").text('"' + data.quote + '" - Kanye West');
    })
}

kanyeRadio.addEventListener("click", displayKanye());

//
