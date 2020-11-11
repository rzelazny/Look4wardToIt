// var previousDateButton = document.querySelector("#previousDate");
// var nextDateButton = document.querySelector("#nextDate");

// Kanye Quote //

var kanyeRadio = document.querySelector("#kanyeQuote");

// function displayKanye() {
    var kanyeURL = "https://api.kanye.rest"

    $.ajax({
        url: kanyeURL,
        method: "GET"
    }).then(function(data){
        console.log("i see kanye");
        $("#dailyQuote").text('"' + data.quote + '" - Kanye West');
    })
// }

// function refreshKanye() {
//     console.log("i see this attempt")
//     $("#dailyQuote").text = "";
//     // displayKanye();
// }

// kanyeRadio.addEventListener("click", displayKanye());
// previousDateButton.addEventListener("click", refreshKanye());
// nextDateButton.addEventListener("click", refreshKanye()); 

// // Dad Joke //

// var dadJokeRadio = document.querySelector("#dadJoke");

// function displayDadJoke() {
//     var dadJokeURL = "https://icanhazdadjoke.com/"

//     $.ajax({
//         url: dadJokeURL,
//         method: "GET",
//         dataType: "JSON",
//     }).then(function(data){
//         // console.log("dad" + data.joke);
//         $("#dailyQuote").text(`"${data.joke}" - Dads of the world`);
//     })
// }

// dadJokeRadio.addEventListener("click", displayDadJoke());

// Famous Quote //

// var randoRadio = document.querySelector("#randoQuote");

// function displayRandoQuote() {
//     var randoQuoteURL = "https://quote-garden.herokuapp.com/api/v2/quotes/random"

//     $.ajax({
//         url: randoQuoteURL,
//         method: "GET"
//     }).then(function(data){
//         console.log(data.quote);
//         $("#dailyQuote").text(`"${data.quote.quoteText}" -${data.quote.quoteAuthor}`);
//     })
// }

// randoRadio.addEventListener("click", displayRandoQuote());