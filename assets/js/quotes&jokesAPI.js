// Kanye Quote //

// var kanyeRadio = document.querySelector("#kanyeQuote");

// function displayKanye() {
//     var kanyeURL = "https://api.kanye.rest"

//     $.ajax({
//         url: kanyeURL,
//         method: "GET"
//     }).then(function(data){
//         console.log("i see kanye");
//         $("#dailyQuote").text('"' + data.quote + '" - Kanye West');
//     })
// }

// kanyeRadio.addEventListener("click", displayKanye());

// Dad Joke //

var dadJokeRadio = document.querySelector("#dadJoke");

function displayDadJoke() {
    var dadJokeURL = "https://icanhazdadjoke.com/"

    $.ajax({
        url: dadJokeURL,
        method: "GET",
        dataType: "JSON",
    }).then(function(data){
        // console.log("dad" + data.joke);
        $("#dailyQuote").text(`"${data.joke}" - Dads of the world`);
    })
}

dadJokeRadio.addEventListener("click", displayDadJoke());